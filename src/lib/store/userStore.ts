import { IUser } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type StateUser = {
  users: IUser[];
  userCreated: IUser | undefined;
  selectedUser: IUser | undefined;
};
export type ActionsUser = {
  addUser: (user: IUser) => void;
  removeUser: () => void;
  updateUser: (payload: IUser) => void;
  setSelectedUser: (payload: IUser) => void;
};

export const useUserStore = create<StateUser & ActionsUser>()(
  persist(
    (set) => ({
      users: [],
      search: "",
      userCreated: undefined,
      selectedUser: undefined,
      addUser: (user: IUser) =>
        set((state) => ({
          users: [user, ...state.users],
          selectedUser: undefined,
          userCreated: user,
        })),
      removeUser: () =>
        set((state) => ({
          users: state.users.filter(
            (user) => user.id !== state.selectedUser?.id
          ),
          selectedUser: undefined,
          userCreated: state.userCreated
            ? state.selectedUser?.id === state.userCreated?.id
              ? undefined
              : state.userCreated
            : undefined,
        })),
      updateUser: (payload: IUser) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === payload.id ? payload : user
          ),
          selectedUser: undefined,
          userCreated: state.userCreated
            ? payload.id === state.userCreated?.id
              ? payload
              : state.userCreated
            : payload,
        })),
      setSelectedUser: (payload: IUser | undefined) =>
        set((state) => ({
          selectedUser: payload,
        })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
