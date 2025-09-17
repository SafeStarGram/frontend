import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default function Comments() {
  return (
    <div className="my-10">
      <h3 className="text-2xl mb-3">코멘트</h3>
      <Comment />
      <hr className="text-gray-300 my-10" />
      <CommentForm />
    </div>
  );
}
