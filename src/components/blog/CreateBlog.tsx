"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Modal from "../Modal";
import { CreateRequestBlog, IComment, IPost } from "@/types";
import { ENDPOINT_URL } from "@/config";
import toast from "react-hot-toast";
import { apiFetch } from "@/helpers/api";
import { useUserStore } from "@/lib/store/userStore";
import { usePostStore } from "@/lib/store/postStore";

interface IProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
}

export default function CreateBlog({ isOpenModal, setIsOpenModal }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { userCreated } = useUserStore();
  const { addPost } = usePostStore();

  const [dataBlog, setDataBlog] = useState<CreateRequestBlog>({
    title: "",
    body: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDataBlog({
      ...dataBlog,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resCreate = await apiFetch<IPost>({
        body: dataBlog,
        url: `${ENDPOINT_URL}/users/${userCreated?.id}/posts`,
        method: "POST",
      });
      if (resCreate) {
        const comments = await apiFetch<IComment[]>({
          url: `${ENDPOINT_URL}/posts/${resCreate?.id}/comments`,
          method: "GET",
        });
        let store = {
          ...resCreate,
          user: userCreated,
          comments,
        };
        addPost(store);
      }
      toast.success(`Success create blog`);
    } catch (error: any) {
      console.log("error =>", error);
      toast.error(`Failed create blog`);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  const reset = () => {
    setDataBlog({
      title: "",
      body: "",
    });
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        title="Create Blog"
        visible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="title" className="text-white/80">
              Title
            </label>
            <input
              type="text"
              placeholder="Input title..."
              className="input input-bordered w-full"
              name="title"
              onChange={onChange}
              value={dataBlog.title}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="body" className="text-white/80">
              Body
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Input body"
              name="body"
              onChange={onChange}
              value={dataBlog.body}
            ></textarea>
          </div>

          <button
            className="btn btn-primary text-white/80 w-full mt-8 flex items-center gap-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span>
              </>
            ) : null}
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}
