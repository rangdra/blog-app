import ListBlog from "@/components/blog/ListBlog";
import { ENDPOINT_URL } from "@/config";
import { apiFetch } from "@/helpers/api";
import AppInitializer from "@/lib/AppInitializer";
import { IComment, IPost, IUser } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs | Blog App",
    description: "Blog App",
  };
}

async function getData() {
  const posts = await apiFetch<IPost[]>({
    url: `${ENDPOINT_URL}/posts`,
    method: "GET",
  });
  const results =
    posts &&
    (await Promise.all(
      posts.map(async (post) => {
        const user = await apiFetch<IUser>({
          url: `${ENDPOINT_URL}/users/${post.user_id}`,
          isReturnNull: true,
          method: "GET",
        });
        const comments = await apiFetch<IComment[]>({
          url: `${ENDPOINT_URL}/posts/${post?.id}/comments`,
          method: "GET",
        });

        return {
          ...post,
          user: user || null,
          comments,
        };
      })
    ));

  return results;
}

export default async function Home() {
  const data = await getData();

  return (
    <AppInitializer posts={data!}>
      <div className="md:w-[40rem] w-full">
        <ListBlog />
      </div>
    </AppInitializer>
  );
}
