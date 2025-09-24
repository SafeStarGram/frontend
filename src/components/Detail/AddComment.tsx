import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LuSend } from "react-icons/lu";
import api from "../../shared/api/axiosInstance";

interface IProps {
  postId: string;
}

interface CommentForm {
  message: string;
}

export default function AddComment({ postId }: IProps) {
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (comment: { postId: number; message: string }) =>
      await api.post(`api/comment`, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      reset();
    },
  });
  const onSubmit = (data: { message: string }) => {
    // 댓글 작성 api 연동
    const newComment = { ...data, postId: Number(postId) };
    mutation.mutate(newComment);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3">
      <input
        {...register("message")}
        placeholder="코멘트 추가"
        className="border border-gray-300 w-full h-10 p-3 rounded-md"
      />
      <button>
        <LuSend className="w-6 h-6 text-blue-300 hover:cursor-pointer hover:text-blue-500 transition" />
      </button>
    </form>
  );
}
