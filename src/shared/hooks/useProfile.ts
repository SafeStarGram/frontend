// useProfile.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";

export interface IProfileData {
  name: string;
  phone: string;
  radio: number;
  department: number;
  position: number;
  image: File | string | null;
}

export const useProfile = (userId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const res = await api.get("profiles/me", { params: { userId } });
      return res.data;
    },
    enabled: !!userId,
  });
  console.log(data);
  console.log(isLoading);

  const profileData: IProfileData | null = data
    ? {
        name: data.name || "",
        phone: data.phoneNumber || "",
        radio: Number(data.radioNumber) || 0,
        department: Number(data.departmentId) || 1,
        position: Number(data.positionId) || 1,
        image: data.profilePhotoUrl || null,
      }
    : null;

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await api.patch("profiles/me", formData, {
        params: { userId },
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });

  return { profileData, isLoading, ...mutation };
};
