import Button from "../../../shared/layout/Button";
import LoadingSpinner from "../../../shared/layout/LoadingSpinner";
import { findDepartment, findPosition } from "../../../shared/config/constants";

interface ManagerListProps {
  users: any[];
  isLoading: boolean;
  error?: any;
}

export default function ManagerList({
  users,
  isLoading,
  error,
}: ManagerListProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">관리자 일람</h3>
        <div className="bg-white rounded-lg p-8 text-center text-red-500">
          오류가 발생했습니다:{" "}
          {error.message || "인증이 필요합니다. 다시 로그인해주세요."}
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">관리자 일람</h3>
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          사용자 데이터가 없습니다.
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">관리자 일람</h3>
      </div>

      {/* 관리자 분류 헤더 */}
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 px-2">
        <div>이름/공종</div>
        <div>연락처/내선 번호</div>
        <div className="text-center">권한/보고 권한</div>
      </div>

      {/* 관리자 목록 */}
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.userId} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* 이름/공종 */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                  👤
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {user.name || "이름 없음"}
                  </div>
                  <div className="text-sm text-gray-500">
                    ({findDepartment(user.department)}{" "}
                    {findPosition(user.position)})
                  </div>
                </div>
              </div>

              {/* 연락처/내선 번호 */}
              <div className="text-sm">
                <div className="text-gray-900">
                  {user.phoneNumber || "연락처 없음"}
                </div>
                <div className="text-gray-500"># {user.radioNumber || "0"}</div>
              </div>

              {/* 권한 버튼 */}
              <div className="flex justify-center ml-3">
                <Button
                  disabled={false}
                  className="rounded-lg px-8 py-3 text-base font-medium bg-teal-500 hover:bg-teal-600 text-white"
                >
                  권한부여
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
