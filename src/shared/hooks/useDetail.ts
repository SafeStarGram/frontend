// src/shared/hooks/useDetail.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import api from "../api/axiosInstance";

export const useDetail = (postId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: detailData, isLoading } = useQuery({
    queryKey: ["detail", { postId }],
    queryFn: async () => (await api.get(`/api/posts/detail/${postId}`)).data,
  });

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`api/posts/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(-1);
    },
    onError: (error) => {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    },
  });

  return { detailData, isLoading, deleteMutation };
};
