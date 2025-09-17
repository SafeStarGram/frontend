import { useQuery } from "@tanstack/react-query";
import Summary from "./Summary";
import api from "../../shared/api/axiosInstance";
// right, button 누를 시 블록 요약 페이지로 이동.
interface IAreaData {
  // 미조치 건수, 위험요소 신고 건수 필요.
  areaName: string;
}

export default function SummaryContainer() {
  const { data, isLoading } = useQuery<IAreaData[]>({
    queryKey: ["summary"],
    queryFn: async () => (await api.get("api/areas/read")).data,
  });

  return (
    <div>
      <h3 className="text-2xl mb-3">현장구역 요약</h3>
      <div className="grid grid-cols-2 gap-4">
        {isLoading
          ? null
          : data?.map((area) => <Summary area={area.areaName} />)}
      </div>
    </div>
  );
}
