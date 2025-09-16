import { useQuery } from "@tanstack/react-query";
import Layout from "../../shared/layout/Layout";
import Noti from "../../shared/layout/Noti";
import api from "../../shared/api/axiosInstance";
import { SyncLoader } from "react-spinners";
import { changeTimeForm } from "../../shared/hooks/useCurrentTime";

export interface INotification {
  title: string;
  areaId: string;
  subAreaId: string;
  createdAt: string;
  reporterRisk: string;
  postPhotoUrl: string;
  postId: string;
}

export default function Notifications() {
  const getData = async () => {
    const res = await api.get("/api/posts", { params: { page: 0, size: 10 } });
    return res.data;
  };
  const { data, isLoading } = useQuery<INotification[]>({
    queryKey: ["notification"],
    queryFn: getData,
  });
  console.log(data);

  return (
    <Layout title="최근 위험 사진 보고" activeTab="notifications">
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <SyncLoader color="#ff7f4c" />
            <span className="text-brand mt-10">
              데이터를 불러오는 중입니다 ...
            </span>
          </div>
        ) : (
          data?.map((noti) => (
            <Noti
              key={noti.postId}
              postId={noti.postId}
              title={noti.title}
              upperArea={noti.areaId}
              lowerArea={noti.subAreaId}
              uploadTime={changeTimeForm(noti.createdAt)}
              score={Number(noti.reporterRisk)}
              photoUrl={noti.postPhotoUrl}
            />
          ))
        )}
      </div>
    </Layout>
  );
}
