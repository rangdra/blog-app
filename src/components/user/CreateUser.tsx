"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Modal from "../Modal";
import { CreateRequestUser, IUser } from "@/types";
import { ENDPOINT_URL } from "@/config";
import toast from "react-hot-toast";
import { apiFetch } from "@/helpers/api";
import { useUserStore } from "@/lib/store/userStore";

interface IProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
  user?: IUser;
  type: "create" | "edit";
}

export default function CreateUser({
  isOpenModal,
  setIsOpenModal,
  user,
  type,
}: IProps) {
  const { addUser, updateUser } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const [dataUser, setDataUser] = useState<CreateRequestUser>({
    name: "",
    email: "",
    gender: "male",
    status: "active",
  });

  useEffect(() => {
    if (user && type === "edit") {
      setDataUser(user);
    }
  }, [user]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (type === "create") {
        const resCreate = await apiFetch<IUser>({
          body: dataUser,
          url: `${ENDPOINT_URL}/users`,
          method: "POST",
        });
        if (resCreate) {
          addUser(resCreate);
        }
      } else {
        const resUpdate = await apiFetch<IUser>({
          body: dataUser,
          url: `${ENDPOINT_URL}/users/${user?.id}`,
          method: "PATCH",
        });
        if (resUpdate) {
          updateUser(resUpdate);
        }
      }

      toast.success(`Success ${type} user`);
    } catch (error: any) {
      console.log("error =>", error);
      toast.error(`Failed ${type} user`);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  const reset = () => {
    setDataUser({
      name: "",
      email: "",
      gender: "male",
      status: "active",
    });
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        title={type === "create" ? "Create" : "Edit" + " User"}
        visible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="name" className="text-white/80">
              Name
            </label>
            <input
              type="text"
              placeholder="Input name..."
              className="input input-bordered w-full"
              name="name"
              onChange={onChange}
              value={dataUser.name}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="email" className="text-white/80">
              Email
            </label>
            <input
              type="email"
              placeholder="Input email..."
              className="input input-bordered w-full"
              name="email"
              onChange={onChange}
              value={dataUser.email}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="gender" className="text-white/80">
              Gender
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-sm"
                  value="male"
                  checked={dataUser.gender === "male"}
                  onChange={onChange}
                />{" "}
                <span>Male</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-sm"
                  value="female"
                  checked={dataUser.gender === "female"}
                  onChange={onChange}
                />{" "}
                <span>Female</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="status" className="text-white/80">
              Status
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  className="radio radio-sm"
                  value="active"
                  checked={dataUser.status === "active"}
                  onChange={onChange}
                />{" "}
                <span>Active</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  className="radio radio-sm"
                  value="inactive"
                  checked={dataUser.status === "inactive"}
                  onChange={onChange}
                />{" "}
                <span>Inactive</span>
              </div>
            </div>
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
