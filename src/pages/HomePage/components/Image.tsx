import { useNavigate } from "react-router";
import { FaAngleRight } from "react-icons/fa";
import { changeTimeForm } from "../../../shared/hooks/useCurrentTime";

interface IProps {
  title: string;
  createdAt: string;
  id: string;
}

export default function Image({ title, createdAt, id }: IProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/noti/${id}`);
  };

  return (
    <div
      className="flex items-center justify-between gap-3 border rounded-md border-gray-300 px-3 py-5 hover:cursor-pointer hover:bg-gray-100 transition"
      onClick={handleClick}
    >
      <img
        src="https://imagescdn.gettyimagesbank.com/500/202202/jv12533599.jpg"
        className="w-14 h-14 rounded-md"
      />
      <div className="flex flex-col flex-1 justify-between gap-2">
        <div className="font-bold">{title}</div>
        <div className="text-gray-500 text-sm">{changeTimeForm(createdAt)}</div>
      </div>
      <FaAngleRight />
    </div>
  );
}
