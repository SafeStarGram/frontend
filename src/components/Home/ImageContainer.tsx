import { useQuery } from "@tanstack/react-query";
import Image from "./Image";
import api from "../../shared/api/axiosInstance";
import type { INotification } from "../../pages/Notifications/Notifications";

export default function ImageContainer() {
  const getData = async () => {
    const res = await api.get("notifications");
    return res.data;
  };
  const { data, isLoading } = useQuery<INotification[]>({
    queryKey: ["main", "notifications"],
    queryFn: getData,
  });

  return (
    <>
      <h3 className="text-2xl mb-3">최근 등록 사진</h3>
      {isLoading ? null : (
        <div>
          {data?.slice(0, 3).map((element) => (
            <Image title={element.title} createdAt={element.createdAt} />
          ))}
        </div>
      )}
    </>
  );
}
