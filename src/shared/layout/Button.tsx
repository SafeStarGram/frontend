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
  return (
    <button
      disabled={disabled}
      className={`text-white p-2 transition ${className} bg-${baseColor} ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : `hover:cursor-pointer hover:bg-${hoverColor}`
      }`}
    >
      {text}
    </button>
  );
}
