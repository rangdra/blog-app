"use client";

import React, { useState } from "react";
import BlogItem from "./BlogItem";
import { IPost } from "@/types";
import { DEFAULT_LIMIT } from "@/config";
import Empty from "../Empty";
import { IoAddSharp } from "react-icons/io5";
import CreateBlog from "./CreateBlog";
import toast from "react-hot-toast";
import { useUserStore } from "@/lib/store/userStore";
import { usePostStore } from "@/lib/store/postStore";

export default function ListBlog() {
  const { userCreated } = useUserStore();
  const { posts } = usePostStore();
  const [search, setSearch] = useState("");

  const [isOpenModalForm, setIsOpenModalForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (data: IPost[], pageSize: number, pageNumber: number) => {
    if (!data) return;
    return data?.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const filteredData = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedData = paginate(filteredData, DEFAULT_LIMIT, currentPage);
  const totalPages = Math.ceil(filteredData?.length / DEFAULT_LIMIT) || 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="form-control flex-1">
            <input
              type="text"
              placeholder="Search by title or body"
              className="input input-bordered w-full"
              onChange={handleSearchChange}
              value={search}
            />
          </div>
          <button
            className="btn btn-primary text-white/80"
            onClick={() => {
              if (!userCreated) {
                toast.error("Please create user first.");
                return;
              }
              setIsOpenModalForm(true);
            }}
          >
            <IoAddSharp />
            Add Blog
          </button>
          <CreateBlog
            isOpenModal={isOpenModalForm}
            setIsOpenModal={setIsOpenModalForm}
          />
        </div>
        {paginatedData && paginatedData.length > 0 ? (
          paginatedData?.map((post) => <BlogItem post={post} key={post.id} />)
        ) : (
          <Empty title="Blog" />
        )}
      </div>

      <div className="my-8 flex justify-center">
        <div className="join">
          {[...Array(totalPages)].map((_, index) => (
            <input
              key={index + 1}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={`${index + 1}`}
              onClick={() => handlePageClick(index + 1)}
              checked={index + 1 === currentPage}
            />
          ))}
        </div>
      </div>
    </>
  );
}
