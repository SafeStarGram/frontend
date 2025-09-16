import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import ImageContainer from "../../components/Home/ImageContainer";

export default function HomePage() {
  const [notificationCount] = useState(9);

  return (
    <Layout
      title="홈"
      showBackButton={false}
      activeTab="home"
      notificationCount={notificationCount}
    >
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            안전 관리 시스템
          </h2>
          <p className="text-gray-600">
            위험 요소를 발견하시면 사진을 찍어서 신고해주세요.
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-2">최근 신고</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  201동 놀이터 방향 크랙
                </p>
                <p className="text-sm text-gray-500">2025. 8. 23, 14:30 PM</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                3점
              </span>
            </div>
          </div>
        </div>
      </div>
      <ImageContainer />
    </Layout>
  );
}
