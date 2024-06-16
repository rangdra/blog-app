export interface IPost {
  id: number;
  user_id: number;
  title: string;
  body: string;
  user?: IUser | null;
  comments: IComment[] | null;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  status: "active" | "inactive";
}

export interface IComment {
  id: number;
  name: string;
  email: string;
  body: string;
  post_id: string;
}

export type CreateRequestUser = Omit<IUser, "id">;
export type CreateRequestBlog = Pick<IPost, "title" | "body">;
