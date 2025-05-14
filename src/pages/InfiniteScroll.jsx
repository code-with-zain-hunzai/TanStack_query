import React, { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinitePost } from "../api/api";

export const InfiniteScroll = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchInfinitePost,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length * 10 : undefined;
      },
    });

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  {
    status === "loading" && <p>Loading...</p>;
  }
  {
    status === "error" && <p>Error loading posts.</p>;
  }

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

      <div ref={loadMoreRef} className="h-10" />
      {isFetchingNextPage && (
        <p className="mt-4 text-gray-500">Loading more posts...</p>
      )}
    </div>
  );
};
