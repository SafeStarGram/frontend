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

//
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("토큰이 만료되었습니다");
    }
    return Promise.reject(error);
  }
);

export default api;
