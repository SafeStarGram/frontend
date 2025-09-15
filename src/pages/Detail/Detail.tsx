import { useParams } from "react-router";
import Layout from "../../shared/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import api from "../../shared/api/axiosInstance";

export default function Detail() {
  const { postId } = useParams();
  const getData = async () => {
    const res = await api.get(`/api/posts/detail/${postId}`);
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["detail", { postId }],
    queryFn: getData,
  });

  console.log(postId);
  console.log(data);
  if (isLoading) return <>wait</>;
  return (
    <Layout title={data.title} activeTab="notifications">
      {data.title}
    </Layout>
  );
}
