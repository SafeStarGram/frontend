import Layout from "../../shared/layout/Layout";
import Noti from "../../shared/layout/Noti";

export default function Notifications() {
  return (
    <Layout title="최근 위험 사진 보고" activeTab="notifications">
      <Noti
        title="2블록 놀이터 방향 크랙"
        upperArea="2블록"
        lowerArea="201동"
        uploadTime="2025-08-23 2:30 AM"
        score={3}
      />
    </Layout>
  );
}
