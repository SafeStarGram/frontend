import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface SubArea {
  id: number;
  name: string;
}

interface AreaDetailContextType {
  // 상태
  areaName: string;
  subAreas: SubArea[];
  newSubAreaName: string;
  selectedImage: File | null;
  imagePreview: string | null;
  
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
  
  // 상태들
  const [areaName] = useState("관리구역 A"); // 실제로는 props나 API에서 받아올 데이터
  const [subAreas, setSubAreas] = useState<SubArea[]>([]);
  const [newSubAreaName, setNewSubAreaName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 액션들
  const addSubArea = () => {
    if (newSubAreaName.trim()) {
      const newSubArea: SubArea = {
        id: Date.now(),
        name: newSubAreaName.trim(),
      };
      setSubAreas([...subAreas, newSubArea]);
      setNewSubAreaName("");
    }
  };

  const removeSubArea = (id: number) => {
    setSubAreas(subAreas.filter((area) => area.id !== id));
  };

  const handleSubAreaChange = (id: number, name: string) => {
    setSubAreas(subAreas.map(area => 
      area.id === id ? { ...area, name } : area
    ));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (subAreas.length === 0) {
      alert("최소 하나의 소구역을 유지해주세요.");
      return;
    }

    // TODO: 실제 API 호출 구현
    console.log("수정할 데이터:", {
      areaName,
      subAreas: subAreas,
      image: selectedImage,
    });

    alert("관리구역 정보가 성공적으로 수정되었습니다!");
    navigate("/management");
  };

  // setAreaName은 현재 사용되지 않지만 인터페이스 일관성을 위해 포함
  const setAreaName = () => {}; // 구역명은 수정 불가

  const value: AreaDetailContextType = {
    // 상태
    areaName,
    subAreas,
    newSubAreaName,
    selectedImage,
    imagePreview,
    
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
