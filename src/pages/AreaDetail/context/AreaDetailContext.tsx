import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAreaDetail } from "../../../features/AreaDetail/useAreaDetail";
import { useUpdateArea } from "../../../features/AreaDetail/useUpdateArea";
import type { SubArea } from "../../Management/types";
import LoadingSpinner from "../../../components/LoadingSpinner";

interface AreaDetailContextType {
  // 상태
  areaId: number | null;
  areaName: string;
  subAreas: SubArea[];
  newSubAreaName: string;
  selectedImage: File | null;
  imagePreview: string | null;
  currentImageUrl: string | null;
  isLoading: boolean;
  error: any;
  isSaving: boolean;
  
  // 액션들
  setAreaName: (name: string) => void;
  addSubArea: () => void;
  removeSubArea: (id: number) => void;
  handleSubAreaChange: (id: number, name: string) => void;
  setNewSubAreaName: (name: string) => void;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
}

const AreaDetailContext = createContext<AreaDetailContextType | undefined>(undefined);

interface AreaDetailProviderProps {
  children: ReactNode;
}

export function AreaDetailProvider({ children }: AreaDetailProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Management 페이지에서 전달받은 areaId 추출
  const areaId = location.state?.areaId || null;
  
  // API 데이터 가져오기
  const { area, isLoading, error } = useAreaDetail(areaId);
  
  // 구역 정보 업데이트 API
  const { updateArea, isUpdating, error: updateError, isSuccess, reset } = useUpdateArea();
  
  // 상태들
  const [areaName, setAreaNameState] = useState("");
  const [subAreas, setSubAreas] = useState<SubArea[]>([]);
  const [newSubAreaName, setNewSubAreaName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  // API 데이터가 로드되면 상태 업데이트
  useEffect(() => {
    if (area) {
      setAreaNameState(area.areaName);
      setSubAreas(area.subAreas || []);
      setCurrentImageUrl(area.imageUrl);
    }
  }, [area]);

  // 업데이트 성공 시 처리
  useEffect(() => {
    if (isSuccess) {
      alert("관리구역 정보가 성공적으로 수정되었습니다!");
      // 선택된 이미지와 미리보기 초기화
      setSelectedImage(null);
      setImagePreview(null);
      navigate("/management");
    }
  }, [isSuccess, navigate]);

  // 업데이트 에러 처리
  useEffect(() => {
    if (updateError) {
      alert(`저장 중 오류가 발생했습니다: ${updateError.message || "알 수 없는 오류"}`);
      reset(); // 에러 상태 초기화
    }
  }, [updateError, reset]);

  // 액션들
  const addSubArea = () => {
    if (newSubAreaName.trim()) {
      const newSubArea: SubArea = {
        subAreaId: Date.now(), // 임시 ID, 실제로는 서버에서 생성
        name: newSubAreaName.trim(),
      };
      setSubAreas([...subAreas, newSubArea]);
      setNewSubAreaName("");
    }
  };

  const removeSubArea = (subAreaId: number) => {
    setSubAreas(subAreas.filter((area) => area.subAreaId !== subAreaId));
  };

  const handleSubAreaChange = (subAreaId: number, name: string) => {
    setSubAreas(subAreas.map(area => 
      area.subAreaId === subAreaId ? { ...area, name } : area
    ));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('파일 선택됨:', file); // 디버깅용
    
    if (file) {
      // 파일 타입 확인
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택할 수 있습니다.');
        return;
      }
      
      // 파일 크기 확인 (10MB 제한)
      if (file.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB 이하여야 합니다.');
        return;
      }
      
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          console.log('이미지 미리보기 생성됨 - 데이터 길이:', result.length); // 디버깅용
          console.log('이미지 데이터 타입:', result.substring(0, 30)); // 디버깅용
          setImagePreview(result);
        } else {
          console.error('FileReader 결과가 올바르지 않음:', result);
          alert('이미지 파일을 읽을 수 없습니다.');
        }
      };
      
      reader.onerror = (e) => {
        console.error('파일 읽기 오류:', e);
        alert('파일을 읽는 중 오류가 발생했습니다.');
      };
      
      reader.onloadstart = () => {
        console.log('파일 읽기 시작'); // 디버깅용
      };
      
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          console.log('파일 읽기 진행:', Math.round((e.loaded / e.total) * 100) + '%'); // 디버깅용
        }
      };
      
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('FileReader 실행 오류:', error);
        alert('파일 읽기를 시작할 수 없습니다.');
      }
    } else {
      console.log('파일이 선택되지 않음'); // 디버깅용
    }
    
    // input 값 초기화 (같은 파일을 다시 선택할 수 있도록)
    event.target.value = '';
  };

  const handleSave = () => {
    if (subAreas.length === 0) {
      alert("최소 하나의 소구역을 유지해주세요.");
      return;
    }

    if (!areaId) {
      alert("구역 ID가 없습니다.");
      return;
    }

    // 실제 API 호출
    updateArea({
      areaId,
      subAreas: subAreas,
      image: selectedImage,
    });
  };

  // 구역명 설정 (현재는 API에서 받아온 값 사용)
  const setAreaName = (name: string) => {
    setAreaNameState(name);
  };

  // 로딩 중일 때 로딩 스피너 표시
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 에러 발생 시 에러 메시지 표시
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">{error.message || "데이터를 불러올 수 없습니다."}</p>
          <button 
            onClick={() => navigate("/management")}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-orange-300"
          >
            관리 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // areaId가 없거나 area 데이터가 없는 경우
  if (!areaId || !area) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">구역 정보를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">올바른 구역을 선택해주세요.</p>
          <button 
            onClick={() => navigate("/management")}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-orange-300"
          >
            관리 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const value: AreaDetailContextType = {
    // 상태
    areaId,
    areaName,
    subAreas,
    newSubAreaName,
    selectedImage,
    imagePreview,
    currentImageUrl,
    isLoading,
    error,
    isSaving: isUpdating,
    
    // 액션들
    setAreaName,
    addSubArea,
    removeSubArea,
    handleSubAreaChange,
    setNewSubAreaName,
    handleImageSelect,
    handleSave,
  };

  return (
    <AreaDetailContext.Provider value={value}>
      {children}
    </AreaDetailContext.Provider>
  );
}

// Custom hook for using the context
export function useAreaDetailContext() {
  const context = useContext(AreaDetailContext);
  if (context === undefined) {
    throw new Error('useAreaDetailContext must be used within an AreaDetailProvider');
  }
  return context;
}
