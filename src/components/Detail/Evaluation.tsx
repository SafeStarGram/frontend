import { CiWarning } from "react-icons/ci";
import { scores } from "../../shared/config/constants";
import { useForm } from "react-hook-form";

interface IProps {
  score: number;
}

export default function Evaluation({ score }: IProps) {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    console.log("hi");
  };

  return (
    <div>
      <h3 className="text-2xl">위험성 평가</h3>
      <div className="flex flex-col gap-5 border rounded-md p-3">
        <div className="flex flex-col">
          <div className="text-gray-500 text-sm">보고자 평가</div>
          <div className="flex gap-5 items-center">
            <CiWarning className="w-6 h-6 text-brand" />
            <div>{score}점</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-500 text-sm">안전/보건 관리자 평가</div>
          <div className="flex gap-5 items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-3 items-center w-full"
            >
              <CiWarning className="w-6 h-6 text-green-700" />
              <select
                className="border rounded-md p-1 w-full flex-1"
                {...register("score")}
              >
                {scores.map((score) => (
                  <option key={score.value} value={score.value}>
                    {score.value}점 {score.text}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
