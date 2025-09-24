import Comment from "./Comment";
import api from "../../shared/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import AddComment from "./AddComment";

interface IProps {
  postId: string;
}

interface IComment {
  userId: number;
  commentId: number;
  userName: string;
  positionId: number;
  departmentId: number;
  message: string;
  createdAt: string;
  postId: string;
  profilePhotoUrl: string;
}

export default function CommentContainer({ postId }: IProps) {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => (await api.get(`api/comment/${postId}`)).data,
  });
  //console.log(comments);
  return (
    <div className="my-10">
      <h3 className="text-2xl mb-3">코멘트</h3>
      {isLoading ? null : (
        <div>
          {comments.map((comment: IComment) => (
            <Comment
              userId={comment.userId}
              postId={postId}
              key={comment.commentId}
              username={comment.userName}
              department={comment.departmentId}
              position={comment.positionId}
              message={comment.message}
              createdAt={comment.createdAt}
              commentId={comment.commentId}
              profilePhotoUrl={comment.profilePhotoUrl}
            />
          ))}
        </div>
      )}
      <hr className="text-gray-300 my-10" />
      <AddComment postId={postId} />
    </div>
  );
}
