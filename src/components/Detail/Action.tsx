import { useForm } from "react-hook-form";
import { IoMdCheckboxOutline } from "react-icons/io";
import api from "../../shared/api/axiosInstance";
import { findDepartment, findPosition } from "../../shared/config/constants";
import { changeTimeForm } from "../../shared/hooks/useCurrentTime";
import { useEffect } from "react";

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
  const {
    checkerName,
    checkerDepartment,
    checkerPosition,
    isCheckedAt,
    actionTakerName,
    actionTakerDepartment,
    actionTakerPosition,
    isActionTakenAt,
  } = detailInfo;
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      isChecked: detailInfo.isChecked,
      isActionTaken: detailInfo.isActionTaken,
    },
  });
  const isChecked = watch("isChecked");
  const isActionTaken = watch("isActionTaken");

  useEffect(() => {
    setValue("isChecked", detailInfo.isChecked);
    setValue("isActionTaken", detailInfo.isActionTaken);
  }, [detailInfo, setValue]);

  const saveToServer = async (data: IActionForm) => {
    try {
      const res = await api.patch(`api/posts/action-status/${postId}`, data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleToggle = (field: keyof IActionForm, currentValue: number) => {
    const newValue = currentValue === 1 ? 0 : 1;
    setValue(field, newValue);
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
            onClick={() => handleToggle("isChecked", isChecked)}
          />
          {isChecked ? (
            <div>
              <div>
                {checkerName} ({findDepartment(String(checkerDepartment))}{" "}
                {findPosition(String(checkerPosition))})
              </div>
              <div className="text-sm text-gray-500">
                {changeTimeForm(isCheckedAt)}
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-5">
          <span>조치</span>
          <input type="hidden" {...register("isActionTaken")} />
          <IoMdCheckboxOutline
            className={`w-8 h-8 hover:cursor-pointer ${
              isActionTaken ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => handleToggle("isActionTaken", isActionTaken)}
          />
          {isActionTaken ? (
            <div>
              <div>
                {actionTakerName} (
                {findDepartment(String(actionTakerDepartment))}{" "}
                {findPosition(String(actionTakerPosition))})
              </div>
              <div className="text-sm text-gray-500">
                {changeTimeForm(isActionTakenAt)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
