import { useInfiniteQuery } from "@tanstack/react-query";
import Layout from "../../shared/layout/Layout";
import Noti from "../../shared/layout/Noti";
import api from "../../shared/api/axiosInstance";
import { SyncLoader } from "react-spinners";
import { changeTimeForm } from "../../shared/hooks/useCurrentTime";
import { useEffect, useRef } from "react";

export interface INotification {
  title: string;
  areaId: string;
  subAreaId: string;
  createdAt: string;
  reporterRisk: string;
  postPhotoUrl: string;
  postId: string;
}

const fetchNotifications = async ({ pageParam }: { pageParam?: number }) => {
  const res = await api.get("/api/posts", {
    params: { page: pageParam ?? 0, size: 5 },
  });
  return res.data;
};

export default function Notifications() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<INotification[]>({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 0 }) =>
      fetchNotifications({ pageParam: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 5) {
        return allPages.length; // 0 → 1 → 2 …
      }
      return null;
    },
  });

  // 스크롤이 끝에 도달하면 fetchNextPage를 호출
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Layout
      title="최근 위험 사진 보고"
      activeTab="notifications"
      showBackButton={false}
    >
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <SyncLoader color="#ff7f4c" />
            <span className="text-brand mt-10">
              데이터를 불러오는 중입니다 ...
            </span>
          </div>
        ) : isError ? (
          <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
        ) : (
          data?.pages.map((page, index) => (
            <div key={index} className="flex flex-col gap-3">
              {page.map((noti) => (
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
              ))}
            </div>
          ))
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <SyncLoader color="#ff7f4c" />
            <span className="text-brand">더 많은 데이터를 불러오는 중...</span>
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <div ref={loadMoreRef} className="h-1" />
        )}
      </div>
    </Layout>
  );
}
