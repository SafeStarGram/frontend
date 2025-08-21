import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  activeTab: "home" | "upload" | "notifications" | "profile";
  notificationCount?: number;
}

export default function Layout({
  children,
  title,
  showBackButton = true,
  onBack,
  activeTab,
  notificationCount = 0,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={title} showBackButton={showBackButton} onBack={onBack} />

      <main className="pt-16 pb-20 px-4">{children}</main>

      <Footer activeTab={activeTab} notificationCount={notificationCount} />
    </div>
  );
}
