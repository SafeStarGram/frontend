import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  findDepartment,
  findPosition,
  scores,
} from "../../shared/config/constants";
import { useNavigate } from "react-router";

interface IForm {
  image: File | null;
  upperArea: string;
  lowerArea: string;
  title: string;
  description: string;
  score: number;
}

interface IUploadData {
  image?: File;
  areaId: string;
  subAreaId: string;
  title: string;
  content: string;
  reporterRisk: string;
}

const getUserInfo = (data: IProfileData | null) => {
  if (!data) return null;
  const { name, department, position } = data;
  return (
    <div>
      {name} ({findDepartment(department)} {findPosition(position)})
    </div>
  );
};

const uploadPost = async (data: IUploadData) => {
  const formData = new FormData();

  if (data.image) {
    formData.append("image", data.image);
  }
  formData.append("areaId", data.areaId);
  formData.append("subAreaId", data.subAreaId);
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("reporterRisk", data.reporterRisk);

  const response = await api.post("api/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export default function Upload() {
  const { register, handleSubmit, setValue, reset, watch } = useForm<IForm>();
  const { profileData } = useProfile();
  const navigate = useNavigate();
  const time = useCurrentTime();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadPost,
    onSuccess: (data) => {
      console.log("업로드 성공:", data);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      reset();
      setPreview(null);
      navigate("/notifications");
    },
    onError: (error) => {
      console.error("업로드 실패:", error);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: async () => (await api.get("api/areas/read")).data,
  });
  console.log(areas);

  const onSubmit = (data: IForm) => {
    const uploadData: IUploadData = {
      areaId: data.upperArea,
      subAreaId: data.lowerArea,
      title: data.title,
      content: data.description,
      reporterRisk: String(data.score),
    };

    if (data.image) {
      uploadData.image = data.image;
    }

    uploadMutation.mutate(uploadData);
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
              <label htmlFor="upperArea" className="text-gray-500 text-sm">
                상위구역
              </label>
              <select
                className="border rounded-xl border-gray-500 p-2"
                id="upperArea"
                {...register("upperArea", { required: true })}
              >
                <option value="">선택하세요</option>
                {areas?.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.areaName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="lowerArea" className="text-gray-500 text-sm">
                하위구역
              </label>
              <select
                className="border rounded-xl border-gray-500 p-2"
                id="lowerArea"
                {...register("lowerArea", { required: true })}
              >
                <option value="">선택하세요</option>
                {areas
                  ?.find((area) => String(area.id) === watch("upperArea"))
                  ?.subAreas.map((subArea) => (
                    <option key={subArea.subAreaId} value={subArea.subAreaId}>
                      {subArea.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex items-center border rounded-2xl border-gray-300 p-5 gap-5">
            <FaRegUserCircle className="text-gray-500 w-6 h-6" />
            <div>
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
          <h3 className="text-xl font-bold mb-3">제목</h3>
          <input
            className="border border-gray-500 rounded-md w-full p-1 px-2"
            {...register("title", { required: true })}
          />
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-bold mb-3">내용</h3>
          <textarea
            className="border border-gray-500 rounded-md w-full p-1 px-2 h-30"
            {...register("description", { required: true })}
          />
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-bold mb-3">
            보고자 위험성 평가(1 ~ 5점)
          </h3>
          <div className="flex items-center border border-gray-300 rounded-xl p-2 gap-2">
            <CiWarning className="text-brand w-6 h-6" />
            <select
              className="border rounded-xl border-gray-500 p-2 w-full"
              {...register("score", { required: true })}
              disabled={uploadMutation.isPending}
            >
              {scores.map((score) => (
                <option key={score.value} value={score.value}>
                  {score.value}점 {score.text}
                </option>
              ))}
            </select>
          </div>
        </div>

        {uploadMutation.isError && (
          <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            업로드 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        )}

        <Button
          disabled={uploadMutation.isPending}
          className={`${
            uploadMutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand hover:cursor-pointer hover:bg-orange-300"
          } transition rounded-2xl mt-5 w-full border-none`}
        >
          {uploadMutation.isPending ? "업로드 중..." : "등록"}
        </Button>
      </form>
    </Layout>
  );
}
