import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import AddAreaSection from "./components/AddAreaSection";
import AreaList from "./components/AreaList";
import StatsButton from "./components/StatsButton";
import ManagerList from "./components/ManagerList";
import { managementAreas } from "./data";
import { useAdminUsers } from "../../shared/hooks/useAdminUsers";

export default function Management() {
  const [notificationCount] = useState(9);
  const { users, isLoading, error } = useAdminUsers();

  return (
    <Layout
      title="현장관리"
      showBackButton={true}
      activeTab="profile"
      notificationCount={notificationCount}
    >
      <div className="space-y-6">
        <AddAreaSection />
        <AreaList areas={managementAreas} />
        <StatsButton />
        <ManagerList users={users} isLoading={isLoading} error={error} />
      </div>
    </Layout>
  );
}
