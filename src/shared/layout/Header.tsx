import { IoArrowBack } from "react-icons/io5";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function Header({
  title,
  onBack,
  showBackButton = true,
}: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="w-10">
          {showBackButton && (
            <button
              onClick={onBack}
              className="mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="뒤로 가기"
            >
              <IoArrowBack className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <div className="w-10" />
      </div>
    </header>
  );
}
