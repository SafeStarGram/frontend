import { useQuery } from "@tanstack/react-query";
import Layout from "../../shared/layout/Layout";
import Noti from "../../shared/layout/Noti";
import api from "../../shared/api/axiosInstance";
import { SyncLoader } from "react-spinners";

interface INotification {
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

  const changeTime = (time: string) => {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  };

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
              uploadTime={changeTime(noti.createdAt)}
              score={Number(noti.reporterRisk)}
              photoUrl={noti.postPhotoUrl}
            />
          ))
        )}
      </div>
    </Layout>
  );
}
