import { useForm } from "react-hook-form";
import { Link } from "react-router";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen max-w-md">
      <div className="text-2xl">세이프스타그램</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-1/2"
      >
        <label htmlFor="email">이메일</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm"
          placeholder="이메일"
          id="email"
          type="string"
          {...register("email")}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm"
          placeholder="비밀번호"
          id="password"
          type="password"
          {...register("password")}
        />
        <button className="bg-orange-500 text-white rounded-full">
          로그인
        </button>
      </form>
      <div className="flex gap-3">
        <div>계정이 없으신가요?</div>
        <Link to="/signup">가입하기</Link>
      </div>
    </div>
  );
}
