import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "../../shared/api/axiosInstance";
import { scores } from "../../shared/config/constants";

interface IForm {
  title: string;
  areaId: string;
  subAreaId: string;
  content: string;
  reporterRisk: string;
}

interface Area {
  id: number;
  areaName: string;
  imageUrl: string | null;
  subAreas: SubArea[];
}

interface SubArea {
  subAreaId: number;
  name: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  detailData: any;
  areas: Area[];
}

export default function EditModal({
  isOpen,
  onClose,
  postId,
  detailData,
  areas,
}: EditModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, watch, setValue } = useForm<IForm>();
  const [selectedAreaId, setSelectedAreaId] = useState<string>("");

  const watchedAreaId = watch("areaId");

  // 선택된 지역의 서브 에리어 찾기
  const selectedArea = areas?.find((area) => area.id === Number(watchedAreaId));
  const subAreas = selectedArea?.subAreas || [];

  useEffect(() => {
    if (detailData && isOpen) {
      const formData = {
        title: detailData.title,
        areaId: detailData.areaId,
        subAreaId: detailData.subAreaId,
        content: detailData.content,
        reporterRisk: detailData.reporterRisk,
      };
      console.log(formData);
      reset(formData);
      setSelectedAreaId(String(detailData.areaId));
    }
  }, [detailData, reset, isOpen]);

  // 지역 변경 시 서브지역 초기화
  useEffect(() => {
    if (watchedAreaId !== selectedAreaId && watchedAreaId) {
      setValue("subAreaId", "");
      setSelectedAreaId(watchedAreaId);
    }
  }, [watchedAreaId, selectedAreaId, setValue]);

  const editMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      for (const [key, value] of formData.entries()) {
        console.log(key, value, typeof value);
      }
      return (await api.patch(`api/posts/${postId}`, formData)).data;
    },
    onSuccess: () => {
      alert("수정이 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["detail", { postId }] });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      alert("수정 중 오류가 발생했습니다.");
    },
  });

  const onSubmit = (data: IForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("areaId", data.areaId);
    formData.append("subAreaId", data.subAreaId);
    formData.append("content", data.content);
    formData.append("reporterRisk", data.reporterRisk);
    editMutation.mutate(formData);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">게시물 수정</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
            >
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <input
                {...register("title", { required: "제목을 입력해주세요" })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="제목을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                위치
              </label>
              <div className="flex flex-col gap-2">
                <select
                  {...register("areaId", { required: "지역을 선택해주세요" })}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">지역을 선택하세요</option>
                  {areas?.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.areaName}
                    </option>
                  ))}
                </select>

                <select
                  {...register("subAreaId")}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!selectedAreaId || subAreas.length === 0}
                >
                  <option value="">세부 위치를 선택하세요</option>
                  {subAreas.map((subArea) => (
                    <option key={subArea.subAreaId} value={subArea.subAreaId}>
                      {subArea.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용
              </label>
              <textarea
                {...register("content", { required: "내용을 입력해주세요" })}
                className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="내용을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                위험성 평가
              </label>
              <select
                {...register("reporterRisk")}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {scores.map((score) => (
                  <option key={score.value} value={score.value}>
                    {score.value}점 {score.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={editMutation.isPending}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={editMutation.isPending}
                className="flex-1 bg-brand hover:bg-orange-300 text-white p-2 rounded-md transition-colors disabled:opacity-50"
              >
                {editMutation.isPending ? "수정 중..." : "수정 완료"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
