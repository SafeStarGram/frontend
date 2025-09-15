import { FaRegCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { findDepartment, findPosition } from "../../shared/config/constants";
import { changeTimeForm } from "../../shared/hooks/useCurrentTime";
import type { IProfileData } from "../../shared/hooks/useProfile";

interface IData {
  areaId: number;
  subAreaId: number;
  createdAt: string;
  content: string;
}

interface OutlineProps {
  data: IData;
  profileData?: IProfileData | null;
}

export default function Outline({ data, profileData }: OutlineProps) {
  return (
    <div className="flex flex-col gap-10 mt-10">
      <div>
        <h3 className="text-2xl mb-2">위험성 보고 개요</h3>
        <div className="flex flex-col gap-3 border rounded-md px-3 py-5">
          <div className="flex items-center gap-3">
            <IoLocationOutline className="text-gray-500 w-6 h-6" />
            <div>
              <div className="text-gray-500 text-sm">위치</div>
              <div>
                {data.areaId} / {data.subAreaId}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaRegUserCircle className="text-gray-500 w-6 h-6" />
            <div>
              <div className="text-gray-500 text-sm">보고자</div>
              <div>
                {profileData?.name} ({findDepartment(profileData?.department)}{" "}
                {findPosition(profileData?.position)})
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaRegCalendarAlt className="text-gray-500 w-6 h-6" />
            <div>
              <div className="text-gray-500 text-sm">보고 시각</div>
              <div>{changeTimeForm(data.createdAt)}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl mb-2">위험성 보고 내용</h3>
        <div className="border rounded-md p-3">{data.content}</div>
      </div>
    </div>
  );
}
