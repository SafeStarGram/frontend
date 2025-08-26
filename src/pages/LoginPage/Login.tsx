//import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { setAccessToken } from "../../store/authSlice";
import Button from "../../shared/layout/Button";
import { LuHardHat } from "react-icons/lu";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({ mode: "onSubmit" });
  const dispatch = useDispatch();
  const onSubmit = async (data: FormData) => {
    // try {
    //   const res = await axios.post("로그인 api", data);
    //   dispatch(setAccessToken(res.data.accessToken));
    //   console.log("로그인 성공", res);
    // } catch (e) {
    //   console.error("로그인 실패", e);
    // }
    dispatch(setAccessToken("testToken"));
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen bg-gray-50">
      <LuHardHat className="text-brand w-32 h-32" />
      <div className="text-3xl text-brand font-bold">세이프스타그램</div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <label htmlFor="email">이메일</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm focus:outline-none"
          placeholder="이메일"
          id="email"
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 양식을 지켜주세요. ex) example@ex.com",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label htmlFor="password">비밀번호</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm focus:outline-none"
          placeholder="비밀번호"
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다.",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Button
          disabled={!isValid}
          text="로그인"
          className={`bg-brand rounded-full font-bold ${
            !isValid
              ? "opacity-30 cursor-not-allowed"
              : "hover:cursor-pointer hover:bg-orange-300"
          }`}
        />
      </form>
      <div className="flex gap-3">
        <div>계정이 없으신가요?</div>
        <Link
          to="/signup"
          className="text-brand hover:text-orange-300 transition"
        >
          가입하기
        </Link>
      </div>
    </div>
  );
}
