import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import AreaImageUpload from "./components/AreaImageUpload";
import AreaEditForm from "./components/AreaEditForm";
import AreaStatistics from "./components/AreaStatistics";
import { AreaDetailProvider } from "./context/AreaDetailContext";

export default function AreaDetail() {

  const [notificationCount] = useState(9);

  return (
    <AreaDetailProvider>
      <Layout
        title="관리구역 자세히보기"
        showBackButton={true}
        activeTab="profile"
        notificationCount={notificationCount}
      >
        <div className="space-y-8">
          <AreaImageUpload />
          <AreaEditForm />
          <AreaStatistics />
        </div>
      </Layout>
    </AreaDetailProvider>
  );
}
