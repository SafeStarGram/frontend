import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export function useSignUp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: SignUpData) => {
      const res = await axios.post(
        "https://chan23.duckdns.org/safe_api/auth/join",
        data
      );
      return res.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert("이메일이 중복되었습니다.");
      }
    },
  });
}
