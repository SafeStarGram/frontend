import { useState } from "react";
import Layout from "../../shared/layout/Layout";
import ImageContainer from "../../components/Home/ImageContainer";
import TBM from "../../components/Home/TBM";
import SummaryContainer from "../../components/Home/SummaryContainer";

export default function HomePage() {
  const [notificationCount] = useState(9);

  return (
    <Layout
      title="홈"
      showBackButton={false}
      activeTab="home"
      notificationCount={notificationCount}
    >
      <div className="flex flex-col gap-10">
        <TBM />
        <SummaryContainer />
        <ImageContainer />
      </div>
    </Layout>
  );
}
