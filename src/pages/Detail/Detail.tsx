import { useParams } from "react-router";
import Layout from "../../shared/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";
import Button from "../../shared/layout/Button";
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { useProfile } from "../../shared/hooks/useProfile";

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
  console.log(profileData);

  console.log(data);
  return (
    <>
      {isDataLoading ? (
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
            <Button disabled={false} className="rounded-md w-1/2">
              <LuPencil /> 수정하기
            </Button>
            <Button
              disabled={false}
              className="rounded-md w-1/2"
              baseColor="red"
              hoverColor="red"
            >
              <MdDeleteOutline />
              삭제하기
            </Button>
          </div>
          <h3>위험성 보고 개요</h3>
          <div className="border rounded-md p-3">
            <div className="flex items-center gap-3">
              <IoLocationOutline className="text-gray-500 w-6 h-6" />
              <div>
                <div className="text-gray-500 text-sm">위치</div>
                <div>
                  {data.areaId} / {data.subAreaId}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaRegUserCircle className="text-gray-500 w-6 h-6" />
              <div>
                <div className="text-gray-500 text-sm">보고자</div>
                <div>{}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaRegCalendarAlt className="text-gray-500 w-6 h-6" />
              <div>
                <div className="text-gray-500 text-sm">보고 시각</div>
                <div>{data.createdAt}</div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
