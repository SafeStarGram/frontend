import Button from "../../../shared/layout/Button";
import { MdBarChart } from "react-icons/md";

export default function StatsButton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <Button
        disabled={false}
        className="w-full bg-brand hover:bg-orange-300 transition rounded-lg text-white font-medium py-3"
      >
        <MdBarChart className="w-5 h-5" />
        종합 통계 보기
      </Button>
    </div>
  );
}
