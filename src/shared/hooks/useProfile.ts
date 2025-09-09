import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export interface IProfileData {
  name: string;
  phone: string;
  radio: number;
  department: string;
  position: string;
  image: File | string | null;
}

export const useProfile = (userId: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("profile/me", { params: { userId } });
      return res.data;
    },
    enabled: !!userId,
  });

  const profileData: IProfileData | null = data
    ? {
        name: data.name || "",
        phone: data.phoneNumber || "",
        radio: Number(data.radioNumber) || 0,
        department: data.departmentId || "1",
        position: data.positionId || "1",
        image: data.profilePhotoUrl || null,
      }
    : null;

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await api.patch("profile/me", formData, {
        params: { userId },
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
