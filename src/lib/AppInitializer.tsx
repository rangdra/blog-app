"use client";

import { IPost, IUser } from "@/types";
import { ReactNode } from "react";
import { useUserStore } from "./store/userStore";
import { usePostStore } from "./store/postStore";

interface IProps {
  users?: IUser[];
  posts?: IPost[];
  children: ReactNode;
}
export default function AppInitializer({ users, children, posts }: IProps) {
  useUserStore.setState({
    users,
  });
  usePostStore.setState({
    posts,
  });

  return children;
}
