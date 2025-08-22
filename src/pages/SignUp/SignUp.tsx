// import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Button from "../../shared/layout/Button";

interface FormData {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // try {
    //   const res = await axios.post("회원가입 api", {
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //   });
    //   console.log("회원가입 성공", res);
    // } catch (e) {
    //   console.error("회원가입 실패", e);
    // }
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen">
      {/* 이미지 */}
      <div className="flex flex-col items-center text-3xl text-brand font-bold">
        <div>세이프스타그램</div>
        <div>회원가입</div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full px-5"
      >
        <label htmlFor="name">이름</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm"
          id="name"
          placeholder="이름을 입력하세요"
          type="text"
          {...register("name")}
        />
        <label htmlFor="email">이메일</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm"
          id="email"
          placeholder="이메일 주소를 입력하세요"
          type="text"
          {...register("email")}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm"
          id="password"
          placeholder="비밀번호를 입력하세요"
          type="password"
          {...register("password")}
        />
        <label htmlFor="checkPassword">비밀번호 확인</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm mb-5"
          id="checkPassword"
          placeholder="비밀번호를 다시 입력하세요"
          type="password"
          {...register("checkPassword")}
        />
        <Button text="가입하기" className="bg-brand rounded-full font-bold" />
      </form>
      <div className="flex gap-3">
        <div>이미 계정이 있으신가요?</div>
        <Link
          to="/login"
          className="text-brand hover:text-orange-300 transition"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
