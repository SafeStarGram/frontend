import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setAccessToken } from "../../store/authSlice";
import Button from "../../shared/layout/Button";
import image from "../../assets/safestargram.png";
import { setUserId } from "../../store/userSlice";
import api from "../../shared/api/axiosInstance";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm<FormData>({ mode: "onSubmit" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post(
        "/auth/login",
        data
      );
      dispatch(setAccessToken(res.data.accessToken));
      dispatch(setUserId(res.data.userId));
      navigate("/");
      console.log("로그인 성공", res);
    } catch (e: any) {
      if (e.response?.status === 401) {
        setError("password", {
          type: "server",
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        });
      } else {
        alert("서버 에러가 발생했습니다. 다시 시도해주세요.");
        console.error("알 수 없는 에러:", e);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen bg-gray-50 py-10">
      <img src={image} className="w-32 h-32" />
      <div className="text-3xl text-brand font-bold mb-10">세이프스타그램</div>
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
          className="rounded-full font-bold mt-5"
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
