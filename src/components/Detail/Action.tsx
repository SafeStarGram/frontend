import { useForm } from "react-hook-form";
import { IoMdCheckboxOutline } from "react-icons/io";
import api from "../../shared/api/axiosInstance";
import { findDepartment, findPosition } from "../../shared/config/constants";
import { changeTimeForm } from "../../shared/hooks/useCurrentTime";
import { useEffect, useState } from "react";

interface IDetailInfo {
  isChecked: number;
  checkerName: string;
  checkerPosition: number;
  checkerDepartment: number;
  isCheckedAt: string;
  isActionTaken: number;
  actionTakerName: string;
  actionTakerPosition: number;
  actionTakerDepartment: number;
  isActionTakenAt: string;
}
interface IProps {
  postId: string;
  detailInfo: IDetailInfo;
}

interface IActionForm {
  isChecked: number;
  isActionTaken: number;
}

export default function Action({ postId, detailInfo }: IProps) {
  const [currentDetail, setCurrentDetail] = useState<IDetailInfo>(detailInfo);

  const { register, watch, setValue, getValues } = useForm<IActionForm>({
    defaultValues: {
      isChecked: detailInfo.isChecked,
      isActionTaken: detailInfo.isActionTaken,
    },
  });

  const isChecked = watch("isChecked") === 1;
  const isActionTaken = watch("isActionTaken") === 1;

  useEffect(() => {
    setCurrentDetail(detailInfo);
    setValue("isChecked", detailInfo.isChecked);
    setValue("isActionTaken", detailInfo.isActionTaken);
  }, [detailInfo, setValue]);

  const saveToServer = async (data: IActionForm) => {
    try {
      const res = await api.patch(`api/posts/action-status/${postId}`, data);
      setCurrentDetail(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = (field: keyof IActionForm, currentValue: number) => {
    const newValue = currentValue === 1 ? 0 : 1;
    setValue(field, newValue, { shouldDirty: true });
    saveToServer(getValues());
  };

  return (
    <div className="my-10">
      <h3 className="text-2xl mb-3">조치 유무</h3>
      <div className="flex flex-col gap-3 border rounded-md p-3">
        <div className="flex items-center gap-5">
          <span>확인</span>
          <input type="hidden" {...register("isChecked")} />
          <IoMdCheckboxOutline
            className={`w-8 h-8 hover:cursor-pointer ${
              isChecked ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() =>
              handleToggle("isChecked", watch("isChecked") as number)
            }
          />
          {isChecked && (
            <div>
              <div>
                {currentDetail.checkerName} (
                {findDepartment(String(currentDetail.checkerDepartment))}{" "}
                {findPosition(String(currentDetail.checkerPosition))})
              </div>
              <div className="text-sm text-gray-500">
                {changeTimeForm(currentDetail.isCheckedAt)}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          <span>조치</span>
          <input type="hidden" {...register("isActionTaken")} />
          <IoMdCheckboxOutline
            className={`w-8 h-8 hover:cursor-pointer ${
              isActionTaken ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() =>
              handleToggle("isActionTaken", watch("isActionTaken") as number)
            }
          />
          {isActionTaken && (
            <div>
              <div>
                {currentDetail.actionTakerName} (
                {findDepartment(String(currentDetail.actionTakerDepartment))}{" "}
                {findPosition(String(currentDetail.actionTakerPosition))})
              </div>
              <div className="text-sm text-gray-500">
                {changeTimeForm(currentDetail.isActionTakenAt)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
