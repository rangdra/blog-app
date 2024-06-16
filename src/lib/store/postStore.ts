import { IPost } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type StatePost = {
  posts: IPost[];
};
export type ActionsPost = {
  addPost: (post: IPost) => void;
};

export const usePostStore = create<StatePost & ActionsPost>()(
  persist(
    (set) => ({
      posts: [],
      search: "",
      addPost: (post: IPost) =>
        set((state) => ({
          posts: [post, ...state.posts],
        })),
    }),
    {
      name: "post",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
