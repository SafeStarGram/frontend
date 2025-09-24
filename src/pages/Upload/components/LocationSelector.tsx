import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import { IoLocationOutline } from "react-icons/io5";
import type { IArea, IForm } from "../types";

interface IProps {
  register: UseFormRegister<IForm>;
  watch: UseFormWatch<IForm>;
  areas: IArea[] | undefined;
}

export const LocationSelector = ({ register, watch, areas }: IProps) => {
  const selectedUpperArea = watch("upperArea");

  return (
    <div className="flex items-center border rounded-2xl border-gray-300 p-5 gap-5">
      <IoLocationOutline className="text-gray-500 w-6 h-6" />
      <div className="flex flex-col w-1/3">
        <label htmlFor="upperArea" className="text-gray-500 text-sm">
          상위구역
        </label>
        <select
          className="border rounded-xl border-gray-500 p-2"
          id="upperArea"
          {...register("upperArea", { required: true })}
        >
          <option value="">선택하세요</option>
          {areas?.map((area) => (
            <option key={area.id} value={area.id}>
              {area.areaName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-1/3">
        <label htmlFor="lowerArea" className="text-gray-500 text-sm">
          하위구역
        </label>
        <select
          className="border rounded-xl border-gray-500 p-2"
          id="lowerArea"
          {...register("lowerArea", { required: true })}
        >
          <option value="">선택하세요</option>
          {areas
            ?.find((area) => String(area.id) === selectedUpperArea)
            ?.subAreas.map((subArea) => (
              <option key={subArea.subAreaId} value={subArea.subAreaId}>
                {subArea.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
