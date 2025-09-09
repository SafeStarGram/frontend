import Layout from "../../shared/layout/Layout";
import Button from "../../shared/layout/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useProfile } from "../../shared/hooks/useProfile";
import ProfileForm from "../../features/ProfileForm";
import type { IProfileData } from "../../shared/hooks/useProfile";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const {
    profileData,
    isLoading: queryLoading,
    isError: queryError,
    mutate,
    isSuccess: mutationSuccess,
    isPending: mutationLoading,
  } = useProfile(Number(userId));
  // 저장 중인지 추적하는 ref
  const isSaving = useRef(false);
  // 프로필 저장 성공 토스트
  useEffect(() => {
    if (mutationSuccess) {
      toast.success("프로필이 성공적으로 저장되었습니다!", {
        position: "top-center",
        autoClose: 3000,
      });
      // 저장 완료 후 잠시 기다린 다음 저장 상태 해제
      setTimeout(() => {
        isSaving.current = false;
      }, 1000);
    }
  }, [mutationSuccess]);

  // 쿼리 에러시 에러 화면 표시
  if (queryError) {
    return (
      <Layout title="프로파일" showBackButton={false} activeTab="profile">
        <div className="text-center py-16">
          <p className="text-red-500 mb-4">
            프로필 데이터를 불러올 수 없습니다. 새로고침을 해주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </Layout>
    );
  }

  // 초기 로딩 중이거나 데이터가 없으면 스켈레톤 코드
  if (queryLoading || !profileData) {
    return <></>;
  }

  const handleSubmit = (data: IProfileData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("radio", data.radio.toString());
    formData.append("department", data.department);
    formData.append("position", data.position);
    if (data.image) {
      formData.append("file", data.image);
    }

    isSaving.current = true;
    mutate(formData);
  };

  return (
    <Layout title="프로파일" showBackButton={false} activeTab="profile">
      <ProfileForm defaultValues={profileData} onSubmit={handleSubmit} />
      <Button
        disabled={mutationLoading}
        text="현장 관리"
        className="rounded-2xl w-full"
        baseColor="black"
        hoverColor="black"
      />
    </Layout>
  );
}
