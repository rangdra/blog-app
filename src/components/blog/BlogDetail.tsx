"use client";

import { IComment, IPost } from "@/types";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import CommentItem from "./CommentItem";
import Empty from "../Empty";
import { useUserStore } from "@/lib/store/userStore";
import { apiFetch } from "@/helpers/api";
import { ENDPOINT_URL } from "@/config";
import toast from "react-hot-toast";

export default function BlogDetail({ post }: { post: IPost }) {
  const [postState, setPostState] = useState<IPost>(post);
  const [comment, setComment] = useState("");
  const { userCreated } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const createComment = async () => {
    if (!userCreated) {
      toast.error("Please create user first!");
      return;
    }
    setIsLoading(true);
    try {
      const resCreate = await apiFetch<IComment>({
        body: {
          name: userCreated?.name,
          email: userCreated?.email,
          body: comment,
        },
        url: `${ENDPOINT_URL}/posts/${post?.id}/comments`,
        method: "POST",
      });
      if (resCreate) {
        setPostState({
          ...postState,
          comments: [resCreate, ...(postState.comments || [])],
        });
      }
      toast.success(`Success create comment`);
    } catch (error: any) {
      console.log("error =>", error);
      toast.error(`Failed create comment`);
    } finally {
      setComment("");
      setIsLoading(false);
    }
  };

  return (
    <div className="card shadow-xl bg-slate-800 relative">
      <div className="card-body p-6 sm:p-8">
        <h2 className="card-title text-white">{postState.title}</h2>
        <p>{postState.body}</p>
        <p className="text-sm">
          <span>Posted by:</span>{" "}
          <span className="text-white">{postState?.user?.name || "-"}</span>
        </p>
        <div className="flex items-center space-x-2">
          <FaRegComment />{" "}
          <span className="text-xs">{postState?.comments?.length}</span>
        </div>
        <div className="divider"></div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="form-control flex-1">
            <input
              type="text"
              placeholder="Add comment"
              className="input input-bordered w-full bg-transparent"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!userCreated}
            />
          </div>
          <button
            className="btn btn-primary text-white/80"
            onClick={createComment}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span>
              </>
            ) : null}
            Comment
          </button>
        </div>
        <h2 className="text-xl text-white mb-2">
          Comment ({postState?.comments?.length})
        </h2>
        <div className="space-y-2">
          {postState?.comments?.length! > 0 ? (
            postState?.comments?.map((comment) => (
              <CommentItem comment={comment} />
            ))
          ) : (
            <Empty title="Comment" />
          )}
        </div>
      </div>
    </div>
  );
}
