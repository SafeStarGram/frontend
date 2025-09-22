import axios from "axios";
import { store } from "../../store/store";
import { clearAccessToken, setAccessToken } from "../../store/authSlice";

const api = axios.create({
  baseURL: "https://chan23.duckdns.org/safe_api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청이 전달되기 전에 작업 수행 => 토큰이 있으면 헤더에 토큰 넣기
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 요청을 받으면 작업 수행
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (
      error.response?.status === 401 &&
      error.response?.data.error === "Unauthorized"
    ) {
      // access token이 만료되었을 경우
      try {
        const res = await api.post("auth/auto-refresh", {});
        console.log("res: ", res);
        const newAccessToken = res.data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));

        // 실패한 요청 재시도
        const config = error.config;
        console.log("config:", config);
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(config);
      } catch (e) {
        // refresh token도 만료된 경우
        console.log("e:", e);
        store.dispatch(clearAccessToken());
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }
    if (
      error.response?.status === 401 &&
      error.message === "InvalidTokenException"
    ) {
      // access token이 없거나 잘못되었을 경우
      store.dispatch(clearAccessToken());
      alert("로그인 정보가 올바르지 않습니다.다시 로그인 해주세요.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
