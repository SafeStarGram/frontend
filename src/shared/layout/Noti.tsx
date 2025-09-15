import { CiWarning } from "react-icons/ci";
import { GrLinkNext } from "react-icons/gr";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
// 기능 추가되면 이미지도 바꿔야함.
interface IProps {
  title: string;
  upperArea: string;
  lowerArea: string;
  uploadTime: string;
  score: number;
  photoUrl: string;
  postId: string;
}

export default function Noti({
  title,
  upperArea,
  lowerArea,
  uploadTime,
  score,
  photoUrl,
  postId,
}: IProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/noti/${postId}`);
  };
  return (
    <div className="flex border border-gray-300 rounded-md p-5 items-center justify-around gap-5">
      <div className="w-32 h-32 overflow-hidden">
        <img
          src={
            photoUrl
              ? photoUrl
              : "https://imagescdn.gettyimagesbank.com/500/202202/jv12533599.jpg"
          }
          className="object-cover object-center h-full w-full rounded-md"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="text-xl font-bold mb-3">{title}</div>
        <div className="flex items-center gap-3">
          <IoLocationOutline className="text-blue-500" />
          <span className="text-gray-500">
            {upperArea}블록 / {lowerArea}동
          </span>
        </div>
        <div className="flex items-center gap-3">
          <IoTimeOutline className="text-blue-500" />
          <span className="text-gray-500">{uploadTime}</span>
        </div>
        <div className="flex items-center gap-3">
          <CiWarning className="text-brand" />
          <span className="text-gray-500">{score}점</span>
        </div>
      </div>
      <div
        onClick={handleClick}
        className="flex items-center justify-center bg-gray-200 rounded-full p-1 hover:cursor-pointer hover:bg-brand transition"
      >
        <GrLinkNext className="w-7 h-7" />
      </div>
    </div>
  );
}
