import { useForm } from "react-hook-form";
import Layout from "../../shared/layout/Layout";
import Button from "../../shared/layout/Button";
import { IoCamera } from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "../../shared/api/axiosInstance";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface IForm {
  name: string;
  phone: string;
  radio: number;
  department: string;
  position: string;
  image: File | null;
}

export default function Profile() {
  const { register, handleSubmit, setValue, reset } = useForm<IForm>();
  const userId = useSelector((state: RootState) => state.user.userId);
  const onSubmit = async (data: IForm) => {
    // 이미지 업로드 api + 유저 정보 저장 api
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("radio", data.radio.toString());
    formData.append("department", data.department);
    formData.append("position", data.position);
    if (data.image) {
      formData.append("image", data.image);
    }
    const res = await api.put("profiles/me", formData, {
      params: { userId },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);
    console.log(data);
  };
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get("profiles/me", { params: { userId } });
      const userData = res.data;
      console.log(userData.data);
      reset({
        name: userData.name,
        phone: userData.phoneNumber,
        radio: userData.radioNumber,
        department: userData.departmentId.toString(),
        position: userData.positionId.toString(),
      });
    };
    fetchUser();
  }, []);

  return (
    <Layout title="프로파일" showBackButton={false} activeTab="profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-4 my-5">
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

          {/* 버튼처럼 보이는 label */}
          <label
            htmlFor="profileUpload"
            className="flex items-center space-x-2 bg-orange-400 hover:bg-orange-500 transition text-white font-bold py-2 px-4 rounded-full cursor-pointer"
          >
            <IoCamera />
            <span>프로필 사진 변경</span>
          </label>
          {/* 숨겨진 파일 input */}
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="border border-gray-300 p-3 rounded-2xl">
          <div className="font-bold mt-2">인적사항</div>
          <hr className="text-gray-300 mb-5 mt-2 border-1" />
          <div className="flex flex-col gap-2">
            <label htmlFor="name">이름</label>
            <input
              className="rounded-xl p-2 border border-gray-300"
              type="string"
              placeholder="이름"
              id="name"
              {...register("name")}
            />
            <hr className="text-gray-300 mb-5 mt-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">핸드폰/무전번호</label>
            <div className="flex gap-2">
              <input
                className="rounded-xl border border-gray-300 p-2 w-2/3"
                type="string"
                placeholder="010-1234-5678"
                id="phone"
                {...register("phone")}
              />
              <input
                className="rounded-xl border border-gray-300 p-2 w-1/3"
                type="string"
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
          disabled={false}
          text="프로필 저장"
          className="rounded-2xl w-full my-3"
        />
      </form>
      <Button
        disabled={false}
        text="현장 관리"
        className="rounded-2xl w-full"
        baseColor="black"
        hoverColor="black"
      />
      {/* 현장관리 버튼 누르면 관리자메뉴로 이동. 관리자만 이동 가능하도록 설정하기. */}
    </Layout>
  );
}
