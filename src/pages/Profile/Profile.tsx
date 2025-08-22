import { useForm } from "react-hook-form";
import Layout from "../../shared/layout/Layout";
import Button from "../../shared/layout/Button";
import { IoCamera } from "react-icons/io5";
import { useState } from "react";

export default function Profile() {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    console.log("success");
  };
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <Layout title="프로파일" showBackButton={false} activeTab="profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center space-y-4">
          {/* 프로필 이미지 미리보기 */}
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200">
            {preview ? (
              <img
                src={preview}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            ) : (
              <IoCamera className="w-full h-full p-6 text-gray-400" />
            )}
          </div>

          {/* 숨겨진 파일 input */}
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* 버튼처럼 보이는 label */}
          <label
            htmlFor="profileUpload"
            className="flex items-center space-x-2 bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
          >
            <IoCamera />
            <span>프로필 사진 변경</span>
          </label>
        </div>
        <div className="border border-gray-300 p-2 rounded-2xl">
          <div>인적사항</div>
          <hr className="text-gray-300" />
          <div className="flex flex-col">
            <label htmlFor="name">이름</label>
            <input
              type="string"
              placeholder="이름"
              id="name"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">핸드폰/무전번호</label>
            <div>
              <input
                type="string"
                placeholder="010-1234-5678"
                id="phone"
                {...register("phone")}
              />
              <input type="string" placeholder="# 9" {...register("radio")} />
            </div>
          </div>
          <div className="flex flex-col">
            <label>부서/직책</label>
            <div>
              <select {...register("department")}>
                <option value="설비">설비</option>
                <option value="안전">안전</option>
                <option value="관리">관리</option>
              </select>
              <select {...register("position")}>
                <option value="사원">사원</option>
                <option value="대리">대리</option>
                <option value="과장">과장</option>
                <option value="부장">부장</option>
              </select>
            </div>
          </div>
        </div>
        <Button
          text="프로필 저장"
          className="bg-brand rounded-2xl w-full my-3"
        />
      </form>
      <Button text="현장 관리" className="bg-black rounded-2xl w-full" />
    </Layout>
  );
}
