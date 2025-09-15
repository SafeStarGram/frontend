import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export interface IProfileData {
  name: string;
  phone: string;
  radio: number;
  department: string;
  position: string;
  image: File | string | null;
  userId: number;
}

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("profile/me");
      return res.data;
    },
  });

  const profileData: IProfileData | null = data
    ? {
        name: data.name || "",
        phone: data.phoneNumber || "",
        radio: Number(data.radioNumber) || 0,
        department: data.department || "1",
        position: data.position || "1",
        image: data.profilePhotoUrl || null,
        userId: data.userId || null,
      }
    : null;

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await api.patch("profile/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      // 캐시 무효화 → 자동으로 최신 데이터 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
  return { profileData, isLoading, ...mutation };
};
