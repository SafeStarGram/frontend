import Layout from "../../shared/layout/Layout";
import { IoLocationOutline } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";

export default function Notifications() {
  return (
    <Layout title="최근 위험 사진 보고" activeTab="notifications">
      <div className="flex border border-gray-300 rounded-md p-5 items-center justify-around gap-5">
        <div className="w-32 h-32 bg-black rounded-md">이미지</div>
        <div className="flex flex-col flex-1">
          <div className="text-xl font-bold mb-3">2블록 놀이터 방향 크랙</div>
          <div className="flex items-center gap-3">
            <IoLocationOutline className="text-blue-500" />
            <span className="text-gray-500">2블록 / 201동</span>
          </div>
          <div className="flex items-center gap-3">
            <IoTimeOutline className="text-blue-500" />
            <span className="text-gray-500">2025-08-23 2:30 AM</span>
          </div>
          <div className="flex items-center gap-3">
            <CiWarning className="text-brand" />
            <span className="text-gray-500">3점</span>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-full p-1">
          <GrLinkNext className="w-5 h-5" />
        </div>
      </div>
    </Layout>
  );
}
