import { useNavigate, useParams } from "react-router";
import Layout from "../../shared/layout/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";
import Button from "../../shared/layout/Button";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useProfile } from "../../shared/hooks/useProfile";
import Outline from "../../components/Detail/Outline";
import Action from "../../components/Detail/Action";
import Evaluation from "../../components/Detail/Evaluation";
import CommentContainer from "../../components/Detail/CommentContainer";
import EditModal from "../../components/Detail/EditModal";
import { useState } from "react";

export default function Detail() {
  const { postId } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: detailData, isLoading: isDataLoading } = useQuery({
    queryKey: ["detail", { postId }],
    queryFn: async () => (await api.get(`/api/posts/detail/${postId}`)).data,
  });

  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: async () => (await api.get("api/areas/read")).data,
  });

  const { profileData, isLoading } = useProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`api/posts/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      navigate(-1);
    },
    onError: (error) => {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
    deleteMutation.mutate(postId!);
  };

  return (
    <>
      {isDataLoading || isLoading || !profileData ? (
        <Layout title="로딩 중..." activeTab="notifications">
          <LoadingSpinner />
        </Layout>
      ) : (
        <Layout title={detailData.title} activeTab="notifications">
          <img
            src={detailData.postPhotoUrl}
            alt="image"
            className="h-64 w-full object-contain"
          />
          <div className="flex w-full gap-3 my-3">
            <Button
              disabled={profileData?.userId !== detailData.reporterId}
              onClick={() => setIsEditModalOpen(true)}
              className="rounded-md w-1/2"
            >
              <LuPencil /> 수정하기
            </Button>
            <Button
              disabled={profileData?.userId !== detailData.reporterId}
              onClick={handleDelete}
              className="rounded-md w-1/2"
              baseColor="red"
              hoverColor="red"
            >
              <FaRegTrashAlt />
              삭제하기
            </Button>
          </div>
          <Outline data={detailData} profileData={profileData} />
          <Action postId={postId!} detailInfo={detailData} />
          <Evaluation
            score={detailData.reporterRisk}
            profileData={profileData}
          />
          <CommentContainer postId={postId!} />

          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            postId={postId!}
            detailData={detailData}
            areas={areas || []}
          />
        </Layout>
      )}
    </>
  );
}
