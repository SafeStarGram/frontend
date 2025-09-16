export default function Comment() {
  // 댓글 정보 가져온 후 뿌려주기
  // {
  //   "commentId": Int,
  //       "postId": Int,
  //       "userId": Int,
  //       "message": "String",
  //       "createdAt": "LocalDate",
  //       "updatedAt": "LocalDate"
  // }
  return (
    <div className="flex gap-3 p-3">
      <img
        src="https://imagescdn.gettyimagesbank.com/500/202202/jv12533599.jpg"
        className="w-12 h-12 rounded-full"
      />
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-xl">윤 대리 (안전 대리)</div>
          <div className="text-sm text-gray-500">2 hours ago</div>
        </div>
        <div className="">확인했습니다. 30분내 조치 예정.</div>
      </div>
    </div>
  );
}
