import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinitePost } from "../api/api";
import { useInView } from "react-intersection-observer";

export const InfiniteScroll = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchInfinitePost,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length * 10 : undefined;
      },
    });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "loading")
    return <p className="text-center mt-4">Loading...</p>;
  if (status === "error")
    return <p className="text-center mt-4">Error loading posts.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <h1 className="text-2xl font-bold mb-4">Infinite Scroll Example</h1>

      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded shadow mb-2 w-full max-w-xl"
            >
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm">{post.body}</p>
            </div>
          ))}
        </React.Fragment>
      ))}

      {/* Sentinel div used for intersection detection */}
      <div ref={ref} className="h-10" />

      {isFetchingNextPage && (
        <p className="mt-4 text-gray-500">Loading more posts...</p>
      )}
    </div>
  );
};
