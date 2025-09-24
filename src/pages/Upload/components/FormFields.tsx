import type { UseFormRegister } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import type { IForm } from "../types";
import { scores } from "../../../shared/config/constants";

interface FormFieldsProps {
  register: UseFormRegister<IForm>;
  isLoading: boolean;
}

export const FormFields = ({ register, isLoading }: FormFieldsProps) => {
  return (
    <>
      <div className="mt-5">
        <h3 className="text-xl font-bold mb-3">제목</h3>
        <input
          className="border border-gray-500 rounded-md w-full p-1 px-2"
          {...register("title", { required: true })}
          disabled={isLoading}
        />
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-bold mb-3">내용</h3>
        <textarea
          className="border border-gray-500 rounded-md w-full p-1 px-2 h-30"
          {...register("description", { required: true })}
          disabled={isLoading}
        />
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-bold mb-3">보고자 위험성 평가(1 ~ 5점)</h3>
        <div className="flex items-center border border-gray-300 rounded-xl p-2 gap-2">
          <CiWarning className="text-brand w-6 h-6" />
          <select
            className="border rounded-xl border-gray-500 p-2 w-full"
            {...register("score", { required: true })}
            disabled={isLoading}
          >
            {scores.map((score) => (
              <option key={score.value} value={score.value}>
                {score.value}점 {score.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
