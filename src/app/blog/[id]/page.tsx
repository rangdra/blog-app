import Empty from "@/components/Empty";
import BlogDetail from "@/components/blog/BlogDetail";
import CommentItem from "@/components/blog/CommentItem";
import { ENDPOINT_URL } from "@/config";
import { apiFetch } from "@/helpers/api";
import { IComment, IPost, IUser } from "@/types";
import { Metadata } from "next";
import React from "react";
import { FaRegComment } from "react-icons/fa6";

interface IProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const post = await apiFetch<IPost>({
    url: `${ENDPOINT_URL}/posts/${props.params.id}`,
    method: "GET",
  });

  return {
    title: post?.title + " | Blog App",
    description: post?.body,
  };
}

async function getData(props: IProps) {
  const post = await apiFetch<IPost>({
    url: `${ENDPOINT_URL}/posts/${props.params.id}`,
    method: "GET",
  });
  const user = await apiFetch<IUser>({
    url: `${ENDPOINT_URL}/users/${post?.user_id}`,
    isReturnNull: true,
    method: "GET",
  });
  const comments = await apiFetch<IComment[]>({
    url: `${ENDPOINT_URL}/posts/${post?.id}/comments`,
    method: "GET",
  });

  return {
    ...post,
    user,
    comments,
  };
}

const DetailBlog = async (props: IProps) => {
  const post = await getData(props);

  return (
    <div className="md:w-[36rem] w-full">
      <BlogDetail post={post as any} />
    </div>
  );
};

export default DetailBlog;
