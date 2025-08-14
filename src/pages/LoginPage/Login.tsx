import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { setAccessToken } from "../../store/authSlice";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();
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
