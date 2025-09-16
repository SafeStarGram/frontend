import Input from "../../../shared/layout/Input";
import Button from "../../../shared/layout/Button";
import { LuMapPin, LuTrash2, LuCirclePlus, LuPencil } from "react-icons/lu";
import { useAreaDetailContext } from "../context/AreaDetailContext";

export default function AreaEditForm() {
  const { 
    areaName,
    subAreas, 
    newSubAreaName, 
    handleSubAreaChange, 
    removeSubArea, 
    setNewSubAreaName, 
    addSubArea,
    handleSave
  } = useAreaDetailContext();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">관리구역 정보 수정</h2>
      
      {/* 소구역 목록 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">소구역</h3>
        <div className="flex items-start space-x-3">
          <LuMapPin className="w-6 h-6 text-gray-400 mt-3" />
          <div className="flex-1 space-y-3">
            {/* 기존 소구역 목록 */}
            {subAreas.map((subArea) => (
              <div key={subArea.id} className="flex items-center space-x-3">
                <Input
                  type="text"
                  value={subArea.name}
                  onChange={(e) => handleSubAreaChange(subArea.id, e.target.value)}
                  className="flex-1"
                />
                <button
                  onClick={() => removeSubArea(subArea.id)}
                  className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center transition-colors"
                >
                  <LuTrash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            {/* 새 소구역 추가 */}
            <div className="flex items-center space-x-3">
              <Input
                type="text"
                placeholder="새로운 소구역을 추가하세요"
                value={newSubAreaName}
                onChange={(e) => setNewSubAreaName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addSubArea();
                  }
                }}
                className="flex-1"
              />
              <button
                onClick={addSubArea}
                className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-xl flex items-center justify-center transition-colors"
              >
                <LuCirclePlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <Button
        disabled={false}
        className="w-full rounded-lg py-4 text-lg font-medium mt-6 mb-4"
        baseColor="brand"
        hoverColor="orange-300"
        onClick={handleSave}
      >
        <LuPencil className="w-5 h-5" />
        관리구역 정보 수정
      </Button>
    </div>
  );
}
