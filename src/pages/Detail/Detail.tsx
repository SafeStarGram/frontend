import { useParams } from "react-router";
import Layout from "../../shared/layout/Layout";
import LoadingSpinner from "../../shared/layout/LoadingSpinner";
import Button from "../../shared/layout/Button";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useProfile } from "../../shared/hooks/useProfile";
import { useState } from "react";
import Outline from "./components/Outline";
import Action from "./components/Action";
import Evaluation from "./components/Evaluation";
import CommentContainer from "./components/CommentContainer";
import EditModal from "./components/EditModal";
import { useArea } from "../../shared/hooks/useArea";
import { useDetail } from "../../shared/hooks/useDetail";

export default function Detail() {
  const { postId } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    detailData,
    isLoading: isDataLoading,
    deleteMutation,
  } = useDetail(postId!);

  const { areas } = useArea();
  const { profileData, isLoading } = useProfile();

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
