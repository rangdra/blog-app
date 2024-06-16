export type FetcherOptions = {
  url: string;
  body?: any;
  isReturnNull?: boolean;
  method: "POST" | "DELETE" | "GET" | "PATCH" | "PUT";
};

export function apiFetch<T>({
  url,
  method,
  body,
  isReturnNull,
}: FetcherOptions): Promise<T | null> {
  return fetch(url, {
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (isReturnNull) {
        return null;
      }
      throw new Error("Failed to fetch data");
    }
    if (method === "DELETE") {
      return {
        isSuccess: true,
      } as T;
    }
    return response.json() as Promise<T>;
  });
}
