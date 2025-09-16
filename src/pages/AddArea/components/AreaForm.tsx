import Input from "../../../shared/layout/Input";
import { LuMapPin } from "react-icons/lu";

interface AreaFormProps {
  areaName: string;
  onAreaNameChange: (value: string) => void;
}

export default function AreaForm({ areaName, onAreaNameChange }: AreaFormProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">구역</h3>
      <div className="flex items-center space-x-3">
        <LuMapPin className="w-6 h-6 text-gray-400" />
        <div className="flex-1">
          <Input
            type="text"
            placeholder="새로운 구역을 추가하세요"
            value={areaName}
            onChange={(e) => onAreaNameChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
