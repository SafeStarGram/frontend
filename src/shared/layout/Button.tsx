interface ButtonProps {
  text: string;
  className: string;
  disabled: boolean;
  baseColor?: string;
  hoverColor?: string;
}

export default function Button({
  text,
  disabled,
  className,
  baseColor = "brand",
  hoverColor = "orange-300",
}: ButtonProps) {
  const getBaseColorClass = (color: string) => {
    switch (color) {
      case "black":
        return "bg-black";
      default:
        return "bg-brand";
    }
  };
  const getHoverColorClass = (color: string) => {
    switch (color) {
      case "black":
        return "hover:bg-gray-700";
      default:
        return "hover:bg-orange-300";
    }
  };
  return (
    <button
      disabled={disabled}
      className={`text-white p-2 transition ${className} ${getBaseColorClass(
        baseColor
      )} ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : `hover:cursor-pointer ${getHoverColorClass(hoverColor)}`
      }`}
    >
      {text}
    </button>
  );
}
