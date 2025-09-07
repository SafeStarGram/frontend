// src/hooks/auth/useSignUp.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (data: SignUpData) => {
      const res = await axios.post(
        "https://chan23.duckdns.org/safe_api/auth/join",
        data
      );
      return res.data;
    },
  });
}
