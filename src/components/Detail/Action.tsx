import { useForm } from "react-hook-form";
import { IoMdCheckboxOutline } from "react-icons/io";
import api from "../../shared/api/axiosInstance";

interface IProps {
  postId: string;
  isChecked: number;
  isActionTaken: number;
}

interface IActionForm {
  isChecked: number; // 확인 여부 (0/1)
  isActionTaken: number; // 조치 여부 (0/1)
}

export default function Action({
  postId,
  isChecked: propIsChecked,
  isActionTaken: propIsActionTaken,
}: IProps) {
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      isChecked: propIsChecked,
      isActionTaken: propIsActionTaken,
    },
  });
  const isChecked = watch("isChecked");
  const isActionTaken = watch("isActionTaken");
  const saveToServer = async (data: IActionForm) => {
    console.log(data);
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

    // 현재 전체 값 모아서 서버로 전송
    const newData = { ...getValues(), [field]: newValue };
    saveToServer(newData);
  };
  return (
    <div className="my-10">
      <h3 className="text-2xl mb-3">조치 유무</h3>
      <div className="flex flex-col gap-3 border rounded-md p-3">
        <div className="flex items-center gap-5">
          <span>확인</span>
          <input type="hidden" {...register("isChecked")} />
          {isChecked === 1 ? (
            <IoMdCheckboxOutline
              className="w-8 h-8 text-blue-500"
              onClick={() => handleToggle("isChecked", isChecked)}
            />
          ) : (
            <IoMdCheckboxOutline
              className="w-8 h-8 text-gray-400"
              onClick={() => handleToggle("isChecked", isChecked)}
            />
          )}
        </div>
        <div className="flex items-center gap-5">
          <span>조치</span>
          <input type="hidden" {...register("isActionTaken")} />
          {isActionTaken === 1 ? (
            <IoMdCheckboxOutline
              className="w-8 h-8 text-blue-500"
              onClick={() => handleToggle("isActionTaken", isActionTaken)}
            />
          ) : (
            <IoMdCheckboxOutline
              className="w-8 h-8 text-gray-400"
              onClick={() => handleToggle("isActionTaken", isActionTaken)}
            />
          )}
        </div>
      </div>
      <button
        onClick={async () => {
          const res = await api.patch(`api/posts/action-status/${postId}`, {
            isChecked: 1,
            isActionTaken: 1,
          });
          console.log(res.data);
        }}
      >
        test
      </button>
    </div>
  );
}
