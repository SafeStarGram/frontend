import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { INotification } from "../../pages/Notifications/types";

const fetchNotifications = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  const res = await api.get("/api/posts", {
    params: { page: pageParam, size: 5 },
  });
  return res.data as INotification[];
};

export const useInfinitePost = () => {
  return useInfiniteQuery<INotification[]>({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) =>
      fetchNotifications({ pageParam: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 5) {
        return allPages.length; // 페이지 계속 증가
      }
      return null;
    },
  });
};
