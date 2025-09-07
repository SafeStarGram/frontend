import { useForm } from "react-hook-form";
import ProfileImageUpload from "./ProfileImageUpload";
import Button from "../shared/layout/Button";
import type { IProfileData } from "../shared/hooks/useProfile";

interface Props {
  defaultValues?: IProfileData;
  onSubmit: (data: IProfileData) => void;
}

export default function ProfileForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, setValue } = useForm<IProfileData>({
    defaultValues,
  });

  const defaultImageUrl =
    typeof defaultValues?.image === "string" ? defaultValues.image : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileImageUpload setValue={setValue} defaultImage={defaultImageUrl} />

      <div className="border border-gray-300 p-3 rounded-2xl">
        <div className="font-bold mt-2">인적사항</div>
        <hr className="text-gray-300 mb-5 mt-2 border-1" />

        <div className="flex flex-col gap-2">
          <label htmlFor="name">이름</label>
          <input
            className="rounded-xl p-2 border border-gray-300"
            placeholder="이름"
            {...register("name")}
          />
          <hr className="text-gray-300 mb-5 mt-2" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone">핸드폰/무전번호</label>
          <div className="flex gap-2">
            <input
              className="rounded-xl border border-gray-300 p-2 w-2/3"
              placeholder="010-1234-5678"
              {...register("phone")}
            />
            <input
              className="rounded-xl border border-gray-300 p-2 w-1/3"
              placeholder="# 9"
              {...register("radio")}
            />
          </div>
          <hr className="text-gray-300 mb-5 mt-2" />
        </div>

        <div className="flex flex-col gap-2">
          <label>부서/직책</label>
          <div className="flex gap-2">
            <select
              {...register("department")}
              className="rounded-xl border border-gray-300 w-2/3 p-2"
            >
              <option value="1">공사</option>
              <option value="2">공무</option>
              <option value="3">관리</option>
              <option value="4">보건</option>
              <option value="5">설비</option>
              <option value="6">안전</option>
              <option value="7">전기</option>
              <option value="8">품질</option>
            </select>
            <select
              {...register("position")}
              className="rounded-xl border border-gray-300 w-1/3 p-2"
            >
              <option value="1">부장</option>
              <option value="2">차장</option>
              <option value="3">과장</option>
              <option value="4">대리</option>
              <option value="5">주임</option>
              <option value="6">사원</option>
            </select>
          </div>
        </div>
      </div>

      <Button
        text="프로필 저장"
        disabled={false}
        className="rounded-2xl w-full my-3"
      />
    </form>
  );
}
