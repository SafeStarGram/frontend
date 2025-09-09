import { useForm } from "react-hook-form";
import ProfileImageUpload from "./ProfileImageUpload";
import Button from "../shared/layout/Button";
import type { IProfileData } from "../shared/hooks/useProfile";
import { useEffect } from "react";

interface Props {
  defaultValues?: IProfileData;
  onSubmit: (data: IProfileData) => void;
}

const departments = [
  { value: 1, text: "공사" },
  { value: 2, text: "공무" },
  { value: 3, text: "관리" },
  { value: 4, text: "보건" },
  { value: 5, text: "설비" },
  { value: 6, text: "안전" },
  { value: 7, text: "전기" },
  { value: 8, text: "품질" },
];

const positions = [
  { value: 1, text: "부장" },
  { value: 2, text: "차장" },
  { value: 3, text: "과장" },
  { value: 4, text: "대리" },
  { value: 5, text: "주임" },
  { value: 6, text: "사원" },
];

export default function ProfileForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, setValue, reset } = useForm<IProfileData>({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
        phone: defaultValues.phone || "",
        radio: defaultValues.radio || 0,
        department: defaultValues.department || "1",
        position: defaultValues.position || "1",
      });
    }
  }, [defaultValues, reset]);

  const defaultImageUrl =
    typeof defaultValues?.image === "string" ? defaultValues.image : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileImageUpload
        setValue={setValue}
        defaultImage={defaultImageUrl}
        key={defaultImageUrl}
      />

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
              placeholder="01012345678"
              {...register("phone")}
            />
            <input
              className="rounded-xl border border-gray-300 p-2 w-1/3"
              placeholder="1"
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
              {departments.map((department) => (
                <option value={department.value} key={department.value}>
                  {department.text}
                </option>
              ))}
            </select>
            <select
              {...register("position")}
              className="rounded-xl border border-gray-300 w-1/3 p-2"
            >
              {positions.map((position) => (
                <option value={position.value} key={position.value}>
                  {position.text}
                </option>
              ))}
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
