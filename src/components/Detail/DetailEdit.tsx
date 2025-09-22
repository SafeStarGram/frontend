import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";
import Layout from "../../shared/layout/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect } from "react";
import { scores } from "../../shared/config/constants";

interface IForm {
  title: string;
  areaId: string;
  subAreaId: string;
  content: string;
  score: string;
}

export default function DetailEdit() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: detailData, isLoading } = useQuery({
    queryKey: ["detail", { postId }],
    queryFn: async () => (await api.get(`/api/posts/detail/${postId}`)).data,
  });

  const { register, handleSubmit, reset } = useForm<IForm>();

  useEffect(() => {
    if (detailData) {
      console.log(detailData);
      reset({
        title: detailData.title,
        areaId: String(detailData.areaId),
        subAreaId: String(detailData.subAreaId),
        content: detailData.content,
        score: String(detailData.reporterRisk),
      });
    }
  }, [detailData, reset]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return (await api.patch(`/api/posts/${postId}`, formData)).data;
    },
    onSuccess: () => {
      alert("수정이 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["detail", { postId }] });
      navigate(`/noti/${postId}`);
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
    formData.append("reporterRisk", data.score);

    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Layout title="수정하기" activeTab="notifications">
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout title="게시물 수정" activeTab="notifications">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label>제목</label>
          <input placeholder="title" {...register("title")} />
        </div>
        <div>
          <label>위치</label>
          <div className="flex gap-2">
            <input placeholder="areaId" {...register("areaId")} />
            <input placeholder="subAreaId" {...register("subAreaId")} />
          </div>
        </div>
        <div>
          <label>내용</label>
          <textarea
            {...register("content")}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label>위험성 평가</label>
          <select {...register("score")} className="border rounded-md p-2">
            {scores.map((score) => (
              <option key={score.value} value={score.value}>
                {score.value}점 {score.text}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-brand hover:bg-orange-300 text-white p-2 rounded-md"
        >
          수정 완료
        </button>
      </form>
    </Layout>
  );
}
