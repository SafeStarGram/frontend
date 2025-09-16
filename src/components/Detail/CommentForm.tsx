import { useForm } from "react-hook-form";
import { LuSend } from "react-icons/lu";

export default function CommentForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    // 댓글 작성 api 연동
    console.log("hi");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3">
      <input
        {...register("comment")}
        placeholder="코멘트 추가"
        className="border border-gray-300 w-full h-10 p-3 rounded-md"
      />
      <button>
        <LuSend className="w-6 h-6 text-blue-300 hover:cursor-pointer hover:text-blue-500 transition" />
      </button>
    </form>
  );
}
