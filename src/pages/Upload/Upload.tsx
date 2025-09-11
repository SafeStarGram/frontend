import { useForm } from "react-hook-form";
import Button from "../../shared/layout/Button";
import Layout from "../../shared/layout/Layout";
import { LuCirclePlus } from "react-icons/lu";
import { useCurrentTime } from "../../shared/hooks/useCurrentTime";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";
import { useState } from "react";
import { useProfile, type IProfileData } from "../../shared/hooks/useProfile";
import api from "../../shared/api/axiosInstance";

interface IForm {
  image: File | null;
  upperArea: string;
  lowerArea: string;
  title: string;
  description: string;
  score: number;
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

const getUserInfo = (data: IProfileData | null) => {
  if (!data) return null;
  const { name, department, position } = data;
  const de = departments.find((d) => d.value === Number(department));
  const pos = positions.find((p) => p.value === Number(position));
  return (
    <div>
      {name} ({de?.text} {pos?.text})
    </div>
  );
};

export default function Upload() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const { profileData } = useProfile();

  const time = useCurrentTime();

  const onSubmit = (data: IForm) => {
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image); // File 객체
    }
    formData.append("upperArea", data.upperArea);
    formData.append("lowerArea", data.lowerArea);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("score", String(data.score));

    api.post("api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log([...formData]); // 실제 들어간 값 확인 가능
  };

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setValue("image", file);
  };
  return (
    <Layout
      title="위험 요소 사진 올리기"
      showBackButton={true}
      activeTab="upload"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col items-center">
          <label
            htmlFor="imageUpload"
            className="w-full h-64 flex flex-col justify-center items-center  rounded-xl cursor-pointer bg-gray-200 hover:bg-gray-300 transition mb-3"
          >
            {preview ? (
              <img
                src={preview}
                alt="업로드 미리보기"
                className="w-full h-full object-cover rounded-xl hover:opacity-80 transition"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <LuCirclePlus className="w-24 h-24 text-orange-500" />
              </div>
            )}
          </label>

          <label
            htmlFor="imageUpload"
            className="flex items-center justify-center bg-brand p-2 hover:cursor-pointer hover:bg-orange-300 transition rounded-md text-white w-full"
          >
            위험 사진 올리기
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <h3 className="text-xl font-bold">위험 요소 설명</h3>

          <div className="flex items-center border rounded-2xl border-gray-300 p-5 gap-5">
            <IoLocationOutline className="text-gray-500 w-6 h-6" />
            <div className="flex flex-col w-1/3">
              {/* 상위구역 하위구역 정보 가져와서 보여줘야함 */}
              <label htmlFor="upperArea" className="text-gray-500 text-sm">
                상위구역
              </label>
              <select
                className="border rounded-xl border-gray-500 p-2"
                id="upperArea"
                {...register("upperArea")}
              >
                <option>1블록</option>
                <option>2블록</option>
                <option>3블록</option>
              </select>
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="lowerArea" className="text-gray-500 text-sm">
                하위구역
              </label>
              <select
                className="border rounded-xl border-gray-500 p-2"
                id="lowerArea"
                {...register("lowerArea")}
              >
                <option>101동</option>
                <option>102동</option>
                <option>103동</option>
              </select>
            </div>
          </div>
          <div className="flex items-center border rounded-2xl border-gray-300 p-5 gap-5">
            <FaRegUserCircle className="text-gray-500 w-6 h-6" />
            <div>
              {/* 유저정보의 이름과 직책 가져오기  */}
              <div className="text-gray-500 text-sm">보고자</div>
              {getUserInfo(profileData)}
            </div>
          </div>
          <div className="flex items-center border rounded-2xl border-gray-300 p-5 gap-5">
            <FaRegCalendarAlt className="text-gray-500 w-6 h-6" />
            <div>
              <div className="text-gray-500 text-sm">보고 시각</div>
              <div>{time}</div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-bold">제목</h3>
          <input
            className="border border-gray-500 rounded-md w-full p-1 px-2"
            {...register("title")}
          />
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-bold">내용</h3>
          <textarea
            className="border border-gray-500 rounded-md w-full p-1 px-2"
            {...register("description")}
          />
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-bold">보고자 위험성 평가(1 ~ 5점)</h3>
          <div className="flex items-center border border-gray-300 rounded-xl p-2 gap-2">
            <CiWarning className="text-brand w-6 h-6" />
            <select
              className="border rounded-xl border-gray-500 p-2 w-full"
              {...register("score")}
            >
              <option>5점</option>
              <option>4점</option>
              <option>3점</option>
              <option>2점</option>
              <option>1점</option>
            </select>
          </div>
        </div>
        <Button
          disabled={false}
          text="등록"
          className="bg-brand hover:cursor-pointer hover:bg-orange-300 transition rounded-2xl mt-5 w-full border-none"
        />
      </form>
    </Layout>
  );
}
