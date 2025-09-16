import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { clearAccessToken } from "../../store/authSlice";
import { clearUserId } from "../../store/userSlice";

export const useAdminUsers = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  
  // JWT 서명 오류 해결을 위해 토큰 완전 초기화
  const clearTokenAndRedirect = () => {
    dispatch(clearAccessToken());
    dispatch(clearUserId());
    localStorage.removeItem('persist:root');
    window.location.href = "/login";
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      try {
        const res = await api.get("api/admin/users");
        return res.data;
      } catch (err: any) {
        // JWT 서명 오류 또는 401 에러 시 토큰 초기화
        if (err.response?.status === 401) {
          clearTokenAndRedirect();
        }
        throw err;
      }
    },
    enabled: !!accessToken, // 토큰이 있을 때만 API 호출
    retry: false, // JWT 오류 시 재시도 방지
  });

  // 에러가 발생하면 토큰 초기화
  if (error && !isLoading) {
    clearTokenAndRedirect();
  }

  return { users: data || [], isLoading, error };
};
