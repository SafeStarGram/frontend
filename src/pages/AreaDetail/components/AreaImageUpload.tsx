import { useRef } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { useAreaDetailContext } from "../context/AreaDetailContext";

export default function AreaImageUpload() {
  const { imagePreview, handleImageSelect } = useAreaDetailContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div 
        onClick={handleImageClick}
        className="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors relative overflow-hidden"
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="관리구역 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center">
              <LuCirclePlus className="w-16 h-16 text-teal-500" />
            </div>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
    </div>
  );
}
