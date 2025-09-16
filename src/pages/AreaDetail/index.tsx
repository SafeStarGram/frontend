import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import { useNavigate } from "react-router";
import AreaImageUpload from "./components/AreaImageUpload";
import AreaEditForm from "./components/AreaEditForm";
import AreaStatistics from "./components/AreaStatistics";

interface SubArea {
  id: number;
  name: string;
}

export default function AreaDetail() {
  const navigate = useNavigate();
  const [notificationCount] = useState(9);
  
  // 관리구역 정보 상태
  const [areaName] = useState("관리구역 A"); // 실제로는 props나 API에서 받아올 데이터
  const [subAreas, setSubAreas] = useState<SubArea[]>([]);
  const [newSubAreaName, setNewSubAreaName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  return (
    <Layout
      title="관리구역 자세히보기"
      showBackButton={true}
      activeTab="profile"
      notificationCount={notificationCount}
    >
      <div className="space-y-8">
        {/* 이미지 업로드 섹션 */}
        <AreaImageUpload 
          imagePreview={imagePreview}
          onImageSelect={handleImageSelect}
        />
        
        {/* 관리구역 정보 수정 */}
        <AreaEditForm 
          areaName={areaName}
          subAreas={subAreas}
          newSubAreaName={newSubAreaName}
          onAreaNameChange={() => {}} // 구역명은 수정 불가로 설정
          onSubAreaChange={handleSubAreaChange}
          onRemoveSubArea={removeSubArea}
          onNewSubAreaNameChange={setNewSubAreaName}
          onAddSubArea={addSubArea}
          onSave={handleSave}
        />
        
        {/* 관리구역 세부 통계 */}
        <AreaStatistics />
      </div>
    </Layout>
  );
}
