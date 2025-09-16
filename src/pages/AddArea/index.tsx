import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import { useNavigate } from "react-router";
import ImageUpload from "./components/ImageUpload";
import AreaForm from "./components/AreaForm";
import SubAreaForm from "./components/SubAreaForm";
import RegisterButton from "./components/RegisterButton";

interface SubArea {
  id: number;
  name: string;
}

export default function AddArea() {
  const navigate = useNavigate();
  const [areaName, setAreaName] = useState("");
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

  const handleRegister = () => {
    if (!areaName.trim()) {
      alert("관리구역명을 입력해주세요.");
      return;
    }
    if (subAreas.length === 0) {
      alert("최소 하나의 소구역을 추가해주세요.");
      return;
    }

    // TODO: 실제 API 호출 구현
    console.log("등록할 데이터:", {
      areaName: areaName.trim(),
      subAreas: subAreas,
      image: selectedImage,
    });

    alert("관리구역이 성공적으로 등록되었습니다!");
    navigate("/management");
  };

  return (
    <Layout
      title="관리구역 추가하기"
      showBackButton={true}
      activeTab="profile"
      notificationCount={9}
    >
      <div className="space-y-4">
        <ImageUpload 
          imagePreview={imagePreview}
          onImageSelect={handleImageSelect}
        />
        
        <AreaForm 
          areaName={areaName}
          onAreaNameChange={setAreaName}
        />
        
        <SubAreaForm 
          subAreas={subAreas}
          newSubAreaName={newSubAreaName}
          onSubAreaChange={handleSubAreaChange}
          onRemoveSubArea={removeSubArea}
          onNewSubAreaNameChange={setNewSubAreaName}
          onAddSubArea={addSubArea}
        />
        
        <RegisterButton onRegister={handleRegister} />
      </div>
    </Layout>
  );
}
