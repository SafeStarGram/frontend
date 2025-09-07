import Layout from "../../shared/layout/Layout";
import Button from "../../shared/layout/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useProfile } from "../../shared/hooks/useProfile";
import ProfileForm from "../../features/ProfileForm";

export interface IForm {
  name: string;
  phone: string;
  radio: number;
  department: number;
  position: number;
  image: File | null;
}

export default function Profile() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const { profileData, isLoading, mutate } = useProfile(Number(userId));

  if (isLoading) return <div>로딩중...</div>;

  const handleSubmit = (data: IForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("radio", data.radio.toString());
    formData.append("department", data.department.toString());
    formData.append("position", data.position.toString());
    if (data.image) {
      formData.append("image", data.image);
    }
    mutate(formData);
  };

  return (
    <Layout title="프로파일" showBackButton={false} activeTab="profile">
      <ProfileForm defaultValues={profileData} onSubmit={handleSubmit} />
      <Button
        disabled={false}
        text="현장 관리"
        className="rounded-2xl w-full"
        baseColor="black"
        hoverColor="gray-700"
      />
    </Layout>
  );
}
