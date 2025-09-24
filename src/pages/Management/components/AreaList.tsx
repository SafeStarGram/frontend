import type { ManagementArea } from '../types';
import { useNavigate } from "react-router";

interface AreaListProps {
  areas: ManagementArea[];
}

export default function AreaList({ areas }: AreaListProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">관리 구역 일람</h3>
      <div className="grid grid-cols-2 gap-4">
        {areas.map((area) => (
          <div key={area.id} className="bg-white rounded-2xl shadow-sm overflow-hidden p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">{area.name}</h4>
            <div className="mb-6">
              <img 
                src={area.image} 
                alt={area.name}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <button 
              onClick={() => navigate("/areadetail")}
              className="w-full bg-gray-100 hover:bg-gray-200 transition rounded-2xl py-4 px-6 flex items-center justify-center text-gray-700 font-medium cursor-pointer"
            >
              자세히 보기
              <span className="ml-2 text-xl">›</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
