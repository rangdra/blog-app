import ListUser from "@/components/user/ListUser";
import { ENDPOINT_URL } from "@/config";
import { apiFetch } from "@/helpers/api";
import AppInitializer from "@/lib/AppInitializer";
import { IUser } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "List User | Blog App",
    description: "Blog App",
  };
}

async function getData() {
  const users = await apiFetch<IUser[]>({
    url: `${ENDPOINT_URL}/users`,
    method: "GET",
  });

  return users;
}

export default async function Home() {
  const data = await getData();

  return (
    <AppInitializer users={data as IUser[]}>
      <div className="md:w-[34rem] w-full">
        <ListUser />
      </div>
    </AppInitializer>
  );
}
