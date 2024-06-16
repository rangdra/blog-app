"use client";
import CreateUser from "./CreateUser";
import { IUser } from "@/types";
import UserItem from "./UserItem";
import { useState } from "react";
import Modal from "../Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { apiFetch } from "@/helpers/api";
import { DEFAULT_LIMIT, ENDPOINT_URL } from "@/config";
import { IoAddSharp } from "react-icons/io5";
import Empty from "../Empty";
import { useUserStore } from "@/lib/store/userStore";

export default function ListUser() {
  const { users, removeUser, selectedUser, setSelectedUser } = useUserStore(
    (state) => state
  );
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalForm, setIsOpenModalForm] = useState(false);
  const [type, setType] = useState<"edit" | "create">("create");
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (data: IUser[], pageSize: number, pageNumber: number) => {
    if (!data) return;

    return data?.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const filteredData = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = paginate(filteredData, DEFAULT_LIMIT, currentPage);

  const totalPages = Math.ceil(filteredData?.length / DEFAULT_LIMIT) || 0;

  const handleDeleteUser = async () => {
    if (!selectedUser) {
      toast.error("Please select user first");
    }
    setIsLoading(true);
    try {
      await apiFetch<{ isSuccess: boolean }>({
        url: `${ENDPOINT_URL}/users/${selectedUser?.id}`,
        method: "DELETE",
      });

      removeUser();
      toast.success("Success delete user");
      setIsOpenModal(false);
    } catch (error) {
      toast.error("Failed delete user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="form-control flex-1">
            <input
              type="text"
              placeholder="Search by name or email"
              className="input input-bordered w-full"
              onChange={handleSearchChange}
              value={search}
            />
          </div>
          <button
            className="btn btn-primary text-white/80"
            onClick={() => {
              setType("create");
              setIsOpenModalForm(true);
            }}
          >
            <IoAddSharp />
            Add User
          </button>
          <CreateUser
            isOpenModal={isOpenModalForm}
            setIsOpenModal={setIsOpenModalForm}
            user={selectedUser}
            type={type}
          />
        </div>
        {paginatedData && paginatedData?.length > 0 ? (
          paginatedData?.map((user) => (
            <UserItem
              user={user}
              key={user.id}
              onSelectUser={(user, type) => {
                if (user) {
                  setSelectedUser(user);
                  if (type === "delete") {
                    setIsOpenModal(true);
                  }

                  if (type === "edit") {
                    setType("edit");
                    setIsOpenModalForm(true);
                  }
                }
              }}
            />
          ))
        ) : (
          <Empty title="User" />
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

      {/* Modal Delete User */}
      <Modal
        title="Delete User"
        visible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <div className="">
          <p className="text-white font-semibold text-lg">
            Are you sure to delete "{selectedUser?.name}"
          </p>
          <div className="flex justify-end mt-8">
            <button
              className="btn btn-error text-white/80 flex items-center gap-2"
              onClick={handleDeleteUser}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                </>
              ) : null}
              <FaRegTrashAlt />
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
