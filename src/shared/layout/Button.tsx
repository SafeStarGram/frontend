interface ButtonProps {
  text: string;
  color: string;
  rounded: string;
}

export default function Button({ text, color, rounded }: ButtonProps) {
  return (
    <button
      className={`text-white font-bold bg-${color} rounded-${rounded} p-2`}
    >
      {text}
    </button>
  );
}
