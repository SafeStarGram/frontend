import Footer from "../../shared/layout/Footer";
import Header from "../../shared/layout/Header";

export default function Profile() {
  return (
    <>
      <Header title="프로파일" showBackButton={false} />
      <Footer activeTab="profile" />
    </>
  );
}
