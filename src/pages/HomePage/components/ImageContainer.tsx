import Image from "./Image";
import { usePost } from "../../../shared/hooks/usePost";

export default function ImageContainer() {
  const { posts, isLoading } = usePost();

  return (
    <div>
      <h3 className="text-2xl mb-3">최근 등록 사진</h3>
      {isLoading ? null : (
        <div className="flex flex-col gap-3">
          {posts?.slice(0, 3).map((element, index) => (
            <Image
              title={element.title}
              createdAt={element.createdAt}
              id={element.postId}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
