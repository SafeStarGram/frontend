import { CiWarning } from "react-icons/ci";
import { findScore, scores } from "../../shared/config/constants";
import { useForm } from "react-hook-form";
import type { IProfileData } from "../../shared/hooks/useProfile";

interface IProps {
  score: number;
  profileData: IProfileData;
}

export default function Evaluation({ score, profileData }: IProps) {
  const { register } = useForm();
  console.log(profileData.position);
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value);
    // try {
    //   await api.patch("위험성 평가 api");
    //   console.log("업데이트 성공:", value);
    // } catch (err) {
    //   console.error("업데이트 실패:", err);
    // }
  };

  return (
    <div>
      <h3 className="text-2xl mb-3">위험성 평가</h3>
      <div className="flex flex-col gap-5 border rounded-md p-3">
        <div className="flex flex-col gap-1">
          <div className="text-gray-500 text-sm">보고자 평가</div>
          <div className="flex gap-5 items-center">
            <CiWarning className="w-6 h-6 text-brand" />
            <div>
              {score}점 {findScore(String(score))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-gray-500 text-sm">안전/보건 관리자 평가</div>
          <div className="flex gap-5 items-center w-full">
            <CiWarning className="w-6 h-6 text-green-700" />

            <select
              className="border rounded-md p-1 w-full flex-1 disabled:cursor-not-allowed disabled:bg-gray-200"
              {...register("score")}
              onChange={handleChange}
              disabled={
                !(
                  Number(profileData.department) === 4 ||
                  Number(profileData.department) === 6
                )
              }
            >
              {scores.map((score) => (
                <option key={score.value} value={score.value}>
                  {score.value}점 {score.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
