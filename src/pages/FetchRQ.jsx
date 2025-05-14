import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { deletePost, fetchPost, updatePost } from "../api/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function FetchRQ() {
  const queryClient = useQueryClient();
  const [num, setNum] = useState(0);

  // Using useQuery to fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", num], // unique key for the query
    queryFn: () => fetchPost(num),
    placeholderData: keepPreviousData, // function to fetch data
    // gcTime: 1000,  // data is garbage collected after 1 second
    // staleTime: 5000, // data is fresh for 5 seconds
    // refetchInterval: 1000, //infinite refetch
    //refetchIntervalInBackground: true, // refetch in background
  });

  // Using useMutation to delete a post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["posts", num], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((post) => post.id !== id);
      });
    },
  });

  // update a post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, id) => {
      queryClient.setQueryData(["posts", num], (postsData) => {
        return postsData?.map((curpost) => {
          return curpost.id === id
            ? { ...curpost, title: apiData.data.title }
            : curpost;
        });
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error.message || "Something went wrong"}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {data?.map(({ id, title, body }) => (
        <div
          key={id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <NavLink to={`/rq/${id}`}>
            <p className="text-gray-500">ID: {id}</p>
            <h2 className="text-xl font-semibold text-blue-600 mt-2">
              {title}
            </h2>
            <p className="text-gray-700 mt-2 line-clamp-3">{body}</p>
          </NavLink>
          <button
            onClick={() => deleteMutation.mutate(id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => updateMutation.mutate(id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded ml-4"
          >
            Update
          </button>
        </div>
      ))}
      <div className="col-span-full flex justify-center items-center gap-4 mt-6">
        <button
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          disabled={num === 0}
          onClick={() => setNum((prev) => prev - 8)}
        >
          Prev
        </button>
        <h2 className="text-lg font-semibold">{Math.floor(num / 8) + 1}</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setNum((prev) => prev + 8)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
