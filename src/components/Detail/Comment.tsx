import { useState } from "react";
import { useSelector } from "react-redux";
import { findDepartment, findPosition } from "../../shared/config/constants";
import { compareTime } from "../../shared/hooks/useCurrentTime";
import type { RootState } from "../../store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";

interface IProps {
  userId: number;
  username: string;
  department: number;
  position: number;
  message: string;
  createdAt: string;
  postId: string;
  commentId: number;
  profilePhotoUrl: string;
}

export default function Comment({
  postId,
  userId,
  username,
  department,
  position,
  message,
  createdAt,
  commentId,
  profilePhotoUrl,
}: IProps) {
  const currentUser = useSelector((state: RootState) => state.user.userId);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(message);

  const deleteMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return await api.delete(`/api/comment/delete/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({
      commentId,
      message,
    }: {
      commentId: number;
      message: string;
    }) => {
      return await api.patch(`/api/comment/modify/${commentId}`, { message });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setIsEditing(false);
    },
  });

  const handleDelete = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteMutation.mutate(commentId);
    }
  };

  const handleEditSubmit = () => {
    if (editMessage.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    editMutation.mutate({ commentId, message: editMessage });
  };

  const handleEditCancel = () => {
    setEditMessage(message);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-3 p-3">
      <img src={profilePhotoUrl} className="w-12 h-12 rounded-full" />
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-xl">
            {username} ({findDepartment(String(department))}{" "}
            {findPosition(String(position))})
          </div>
          <div className="text-sm text-gray-500">{compareTime(createdAt)}</div>
        </div>

        {isEditing ? (
          <div className="mt-2">
            <input
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded resize-none"
              disabled={editMutation.isPending}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleEditSubmit}
                disabled={editMutation.isPending}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
              >
                {editMutation.isPending ? "저장 중..." : "저장"}
              </button>
              <button
                onClick={handleEditCancel}
                disabled={editMutation.isPending}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="">{message}</div>
            {currentUser === userId && (
              <div className="flex gap-2 mt-1">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    수정
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="text-red-500 hover:underline text-sm"
                >
                  {deleteMutation.isPending ? "삭제 중..." : "삭제"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
