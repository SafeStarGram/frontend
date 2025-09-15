import { CiWarning } from "react-icons/ci";

interface IProps {
  score: number;
}

export default function Evaluation({ score }: IProps) {
  return (
    <div>
      <h3 className="text-2xl">위험성 평가</h3>
      <div className="flex flex-col gap-5 border rounded-md p-3">
        <div className="flex flex-col">
          <div className="text-gray-500 text-sm">보고자 평가</div>
          <div className="flex gap-5 items-center">
            <CiWarning className="w-6 h-6 text-brand" />
            <div>{score}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-500 text-sm">안전/보건 관리자 평가</div>
          <div className="flex gap-5 items-center">
            <CiWarning className="w-6 h-6 text-green-700" />
            <div className="text-red-700">내용 추가</div>
          </div>
        </div>
      </div>
    </div>
  );
}
