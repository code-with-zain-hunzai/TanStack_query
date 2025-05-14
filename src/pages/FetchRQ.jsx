import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchPost } from "../api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function FetchRQ() {
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

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error.message || "Somethings wnet wrong"}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {data?.map((post) => {
        const { id, title, body } = post;
        return (
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
          </div>
        );
      })}
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
