import { useQuery } from "@tanstack/react-query";
import Image from "./Image";
import api from "../../shared/api/axiosInstance";
import type { INotification } from "../../pages/Notifications/Notifications";

export default function ImageContainer() {
  const { data, isLoading } = useQuery<INotification[]>({
    queryKey: ["main", "notifications"],
    queryFn: async () => (await api.get("notifications")).data,
  });
  console.log(data);
  return (
    <div>
      <h3 className="text-2xl mb-3">최근 등록 사진</h3>
      {isLoading ? null : (
        <div className="flex flex-col gap-3">
          {data?.slice(0, 3).map((element, index) => (
            <Image
              title={element.title}
              createdAt={element.createdAt}
              id={element.postId}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
