import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import api from "../../shared/api/axiosInstance";
import type { IUploadData } from "../types/upload";

const uploadPost = async (data: IUploadData) => {
  const formData = new FormData();

  if (data.image) {
    formData.append("image", data.image);
  }
  formData.append("areaId", data.areaId);
  formData.append("subAreaId", data.subAreaId);
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("reporterRisk", data.reporterRisk);

  const response = await api.post("api/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const useUpload = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadPost,
    onSuccess: (data) => {
      console.log("업로드 성공:", data);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      navigate("/notifications");
    },
    onError: (error) => {
      console.error("업로드 실패:", error);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: async () => (await api.get("api/areas/read")).data,
  });

  return { uploadMutation, areas };
};
