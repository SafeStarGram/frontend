import { FaAngleRight, FaRegBuilding } from "react-icons/fa";

interface IProps {
  area: string;
}

export default function Summary({ area }: IProps) {
  return (
    <div className="flex flex-col gap-3 border-2 border-gray-300 rounded-md p-3">
      <div className="flex justify-between items-center gap-3">
        <FaRegBuilding className="text-blue-500" />
        <span className="flex-1">{area}</span>
        <FaAngleRight />
      </div>
      <div>
        <div>7 미조치 안전사항</div>
        <div>12 최근 위험요소 신고</div>
      </div>
      <div>
        <button className="bg-gray-200 p-2 w-full rounded-md hover:cursor-pointer hover:bg-gray-300 transition">
          {area} 보기
        </button>
      </div>
    </div>
  );
}
