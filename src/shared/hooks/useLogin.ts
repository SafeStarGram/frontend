import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/authSlice";
import { setUserId } from "../../store/userSlice";
import { useNavigate } from "react-router";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await axios.post(
        "https://chan23.duckdns.org/safe_api/auth/login",
        data,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setAccessToken(data.accessToken));
      dispatch(setUserId(data.userId));
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("서버 에러가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });
}
