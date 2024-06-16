import { IPost } from "@/types";
import Link from "next/link";
import React from "react";
import { FaRegComment } from "react-icons/fa6";

interface IProps {
  post: IPost;
}
export default function BlogItem({ post }: IProps) {
  return (
    <div className="card shadow-xl bg-slate-800 relative">
      <div className="card-body p-6 sm:p-8">
        <h2 className="card-title text-white">{post.title}</h2>
        <p className="line-clamp-3">{post.body}</p>
        <p className="text-sm">
          <span>Posted by:</span>{" "}
          <span className="text-white">{post?.user?.name || "-"}</span>
        </p>
        <div className="flex items-center space-x-2">
          <FaRegComment />{" "}
          <span className="text-xs">{post?.comments?.length || 0}</span>
        </div>
      </div>
      <Link
        href={`/blog/${post.id}`}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
