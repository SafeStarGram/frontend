import { changeTimeForm } from "../../shared/hooks/useCurrentTime";

interface IProps {
  title: string;
  createdAt: string;
}

export default function Image({ title, createdAt }: IProps) {
  return (
    <div className="flex gap-3 border rounded-md border-gray-300 px-3 py-5">
      <img
        src="https://imagescdn.gettyimagesbank.com/500/202202/jv12533599.jpg"
        className="w-14 h-14 rounded-md"
      />
      <div className="flex flex-col justify-around">
        <div className="font-bold">{title}</div>
        <div className="text-gray-500 text-sm">{changeTimeForm(createdAt)}</div>
      </div>
    </div>
  );
}
