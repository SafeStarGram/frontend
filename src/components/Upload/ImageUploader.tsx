import { LuCirclePlus } from "react-icons/lu";

interface ImageUploaderProps {
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader = ({
  preview,
  onFileChange,
}: ImageUploaderProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <label
        htmlFor="imageUpload"
        className="w-full h-64 flex flex-col justify-center items-center rounded-xl cursor-pointer bg-gray-200 hover:bg-gray-300 transition mb-3"
      >
        {preview ? (
          <img
            src={preview}
            alt="업로드 미리보기"
            className="w-full h-full object-contain rounded-xl hover:opacity-80 transition"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <LuCirclePlus className="w-24 h-24 text-orange-500" />
            <p className="text-sm text-gray-600">위험 사진 올리기</p>
          </div>
        )}
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
};
