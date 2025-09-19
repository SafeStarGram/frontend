import { useParams } from "react-router";
import Layout from "../../shared/layout/Layout";
import { useQuery } from "@tanstack/react-query";
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

export default function Detail() {
  const { postId } = useParams();

  const { data: detailData, isLoading: isDataLoading } = useQuery({
    queryKey: ["detail", { postId }],
    queryFn: async () => (await api.get(`/api/posts/detail/${postId}`)).data,
  });

  const { profileData, isLoading } = useProfile();
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
              className="rounded-md w-1/2"
            >
              <LuPencil /> 수정하기
            </Button>
            <Button
              disabled={profileData?.userId !== detailData.reporterId}
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
        </Layout>
      )}
    </>
  );
}
