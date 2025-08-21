import axios from "axios";
import { store } from "../../store/store";

const api = axios.create({
  baseURL: "API 기본 주소",
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
    if (
      error.response?.status === 401 &&
      error.message === "InvalidTokenException"
    ) {
      // 토큰이 없거나 잘못되었을 경우
      // 로그아웃
    }
    if (error.response?.status === 401 && error.message === "TokenExpired") {
      // 토큰이 만료되었을 경우
      // refresh token을 이용해 토큰 새로 발급
      // 새로 발급받은 토큰 redux에 저장
      // 재요청
    }
    return Promise.reject(error);
  }
);

export default api;

// api를 이용해서 통신.
