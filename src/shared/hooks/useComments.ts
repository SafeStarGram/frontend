import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useComments = (postId: string) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => (await api.get(`api/comment/${postId}`)).data,
  });

  return { comments, isLoading };
};

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) =>
      (await api.post("api/comment", { postId: Number(postId), message })).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: number) =>
      await api.delete(`/api/comment/delete/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

export const useEditComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      message,
    }: {
      commentId: number;
      message: string;
    }) => {
      return await api.patch(`/api/comment/modify/${commentId}`, { message });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};
