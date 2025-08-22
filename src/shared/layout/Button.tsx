interface ButtonProps {
  text: string;
  className: string;
}

export default function Button({ text, className }: ButtonProps) {
  return <button className={`text-white p-2 ${className}`}>{text}</button>;
}
