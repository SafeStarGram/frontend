import { useRef, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { useAreaDetailContext } from "../context/AreaDetailContext";

export default function AreaImageUpload() {
  const { imagePreview, currentImageUrl, handleImageSelect, isSaving } = useAreaDetailContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleImageClick = () => {
    if (!isSaving) {
      console.log('이미지 클릭 - 파일 선택 창 열기'); // 디버깅용
      fileInputRef.current?.click();
    }
  };

  // 표시할 이미지 결정: 새로 선택한 이미지 > 기존 이미지 > 기본 이미지
  const displayImage = imagePreview || currentImageUrl;
  
  console.log('이미지 상태:', { // 디버깅용
    imagePreview: imagePreview ? '있음' : '없음',
    currentImageUrl: currentImageUrl ? '있음' : '없음',
    displayImage: displayImage ? '있음' : '없음'
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">구역 이미지</h3>
      <div 
        onClick={handleImageClick}
        className={`w-full h-80 rounded-2xl flex items-center justify-center transition-colors relative overflow-hidden ${
          displayImage 
            ? 'bg-transparent' 
            : 'bg-gray-200 hover:bg-gray-300'
        } ${
          isSaving 
            ? 'cursor-not-allowed opacity-50' 
            : 'cursor-pointer'
        }`}
      >
        {displayImage ? (
          <>
            <img
              src={displayImage}
              alt="관리구역 이미지"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoadStart={() => {
                setImageLoading(true);
                console.log('이미지 로드 시작'); // 디버깅용
              }}
              onLoad={() => {
                setImageLoading(false);
                console.log('이미지 로드 성공:', displayImage.substring(0, 50) + '...'); // 디버깅용
              }}
              onError={(e) => {
                setImageLoading(false);
                console.error('이미지 로드 실패:', displayImage); // 디버깅용
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop";
              }}
              style={{
                backgroundColor: 'transparent',
                minHeight: '100%',
                minWidth: '100%'
              }}
            />
            
            {/* 이미지 로딩 중 표시 */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">이미지 로딩 중...</p>
                </div>
              </div>
            )}
            
            {/* 이미지 위에 편집 아이콘 오버레이 */}
            {!isSaving && !imageLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center pointer-events-none hover:pointer-events-auto">
                <div className="opacity-0 hover:opacity-100 transition-opacity">
                  <LuCirclePlus className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center">
              <LuCirclePlus className="w-16 h-16 text-teal-500" />
            </div>
            <p className="text-gray-500 text-center">
              {isSaving ? "저장 중..." : "클릭하여 구역 이미지를 업로드하세요"}
            </p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,image/jpeg,image/jpg,image/png,image/gif,image/webp"
        capture="environment"
        onChange={(e) => {
          console.log('파일 input onChange 호출됨'); // 디버깅용
          handleImageSelect(e);
        }}
        disabled={isSaving}
        className="hidden"
        style={{ display: 'none' }}
      />
      {imagePreview && !isSaving && (
        <p className="text-sm text-teal-600 mt-2 text-center">
          새 이미지가 선택되었습니다. 저장 버튼을 눌러 적용하세요.
        </p>
      )}
      {isSaving && (
        <p className="text-sm text-blue-600 mt-2 text-center">
          이미지를 포함한 구역 정보를 저장하고 있습니다...
        </p>
      )}
    </div>
  );
}
