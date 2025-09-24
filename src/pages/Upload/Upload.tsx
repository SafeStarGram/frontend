import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../shared/layout/Button";
import Layout from "../../shared/layout/Layout";
import { useCurrentTime } from "../../shared/hooks/useCurrentTime";
import { useProfile } from "../../shared/hooks/useProfile";
import type { IForm, IUploadData } from "./types";
import { ImageUploader } from "./components/ImageUploader";
import { LocationSelector } from "./components/LocationSelector";
import { ReportInfo } from "./components/ReportInfo";
import { FormFields } from "./components/FormFields";
import { useArea } from "../../shared/hooks/useArea";
import { usePost } from "../../shared/hooks/usePost";

export default function Upload() {
  const { register, handleSubmit, setValue, reset, watch } = useForm<IForm>();
  const { profileData } = useProfile();
  const time = useCurrentTime();
  const { uploadMutation } = usePost();
  const { areas } = useArea();
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

    uploadMutation.mutate(uploadData, {
      onSuccess: () => {
        reset();
        setPreview(null);
      },
    });
  };

  return (
    <Layout
      title="위험 요소 사진 올리기"
      showBackButton={false}
      activeTab="upload"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUploader preview={preview} onFileChange={handleFileChange} />

        <div className="flex flex-col gap-5 mt-10">
          <h3 className="text-xl font-bold">위험 요소 설명</h3>
          <LocationSelector register={register} watch={watch} areas={areas} />
          <ReportInfo profileData={profileData} currentTime={time} />
        </div>

        <FormFields register={register} isLoading={uploadMutation.isPending} />

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
