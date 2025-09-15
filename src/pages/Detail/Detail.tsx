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
import Comment from "../../components/Detail/Comment";
import Action from "../../components/Detail/Action";
import Evaluation from "../../components/Detail/Evaluation";

export default function Detail() {
  const { postId } = useParams();
  const getData = async () => {
    const res = await api.get(`/api/posts/detail/${postId}`);
    return res.data;
  };

  const { data, isLoading: isDataLoading } = useQuery({
    queryKey: ["detail", { postId }],
    queryFn: getData,
  });

  const { profileData, isLoading } = useProfile();
  console.log(data);
  return (
    <>
      {isDataLoading || isLoading ? (
        <Layout title="로딩 중..." activeTab="notifications">
          <LoadingSpinner />
        </Layout>
      ) : (
        <Layout title={data.title} activeTab="notifications">
          <img
            src="https://plus.unsplash.com/premium_photo-1757322537430-ca9306b803f2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            className="h-64 w-full"
          />
          <div className="flex w-full gap-3 my-3">
            <Button
              disabled={profileData?.userId !== data.reporterId}
              className="rounded-md w-1/2"
            >
              <LuPencil /> 수정하기
            </Button>
            <Button
              disabled={profileData?.userId !== data.reporterId}
              className="rounded-md w-1/2"
              baseColor="red"
              hoverColor="red"
            >
              <FaRegTrashAlt />
              삭제하기
            </Button>
          </div>
          <Outline data={data} profileData={profileData} />
          <Action />
          <Evaluation score={data.reporterRisk} />
          <Comment />
        </Layout>
      )}
    </>
  );
}
