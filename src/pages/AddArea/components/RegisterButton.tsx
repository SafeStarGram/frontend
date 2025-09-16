import Button from "../../../shared/layout/Button";
import { LuUpload } from "react-icons/lu";

interface RegisterButtonProps {
  onRegister: () => void;
}

export default function RegisterButton({ onRegister }: RegisterButtonProps) {
  return (
    <Button
      disabled={false}
      className="w-full rounded-lg py-4 text-lg font-medium mt-8 mb-4"
      baseColor="brand"
      hoverColor="orange-300"
      onClick={onRegister}
    >
      <LuUpload className="w-5 h-5" />
      관리구역 등록하기
    </Button>
  );
}
