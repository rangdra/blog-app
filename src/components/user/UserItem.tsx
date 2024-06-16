import { IUser } from "@/types";
import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

interface IProps {
  user: IUser;
  onSelectUser?: (user: IUser, type: "edit" | "delete") => void;
}
export default function UserItem({ user, onSelectUser }: IProps) {
  let gender = user.gender
    ? user.gender.charAt(0)?.toUpperCase() + user.gender.slice(1)
    : "";

  return (
    <div className="card shadow-xl bg-slate-800 relative w-full">
      <div className="card-body p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-lg text-white">{user.name}</h2>
          <div
            className={`badge badge-outline text-center ${
              user.status === "inactive" ? "badge-error" : "badge-success"
            }`}
          >
            {user.status}
          </div>
        </div>
        <p className="text-sm">{user.email}</p>
        <p className="text-sm">{gender}</p>
        <div className="flex items-center space-x-2">
          <button
            className="btn btn-success text-white/80 btn-sm"
            onClick={() => onSelectUser?.(user, "edit")}
          >
            <AiTwotoneEdit />
            Edit
          </button>
          <button
            className="btn btn-error text-white/80 btn-sm"
            onClick={() => onSelectUser?.(user, "delete")}
          >
            <FaRegTrashAlt />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
