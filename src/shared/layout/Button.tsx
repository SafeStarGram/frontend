interface ButtonProps {
  text: string;
  className: string;
  disabled: boolean;
}

export default function Button({ text, disabled, className }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`text-white p-2 transition ${className}`}
    >
      {text}
    </button>
  );
}
