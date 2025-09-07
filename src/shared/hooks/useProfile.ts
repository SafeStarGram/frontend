import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";

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

  const profileData = {
    name: data.name,
    phone: data.phoneNumber,
    radio: Number(data.radioNumber),
    department: Number(data.departmentId),
    position: Number(data.positionId),
    image: data.profilePhotoUrl,
  };

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
