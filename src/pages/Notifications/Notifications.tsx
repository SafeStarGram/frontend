import { useQuery } from "@tanstack/react-query";
import Layout from "../../shared/layout/Layout";
import Noti from "../../shared/layout/Noti";
import api from "../../shared/api/axiosInstance";

interface INotification {
  title: string;
  subAreaId: string;
  createdAt: string;
  reporterRisk: string;
  postPhotoUrl: string;
}

export default function Notifications() {
  const getData = async () => {
    const res = await api.get("/api/posts", { params: { page: 0, size: 10 } });
    return res.data;
  };
  const { data } = useQuery<INotification[]>({
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
        {data?.map((noti) => (
          <Noti
            title={noti.title}
            upperArea={"2블록"} //noti.areaId 필요
            lowerArea={noti.subAreaId}
            uploadTime={changeTime(noti.createdAt)}
            score={Number(noti.reporterRisk)}
            photoUrl={noti.postPhotoUrl}
          />
        ))}
        <Noti
          title="2블록 놀이터 방향 크랙"
          upperArea="2블록"
          lowerArea="201동"
          uploadTime="2025-08-23 2:30 AM"
          score={3}
          photoUrl=""
        />
      </div>
    </Layout>
  );
}
