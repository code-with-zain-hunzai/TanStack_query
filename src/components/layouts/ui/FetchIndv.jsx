import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchInvPost } from "../../../api/api";

export default function FetchIndv() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchInvPost(id),
    enabled: !!id, // only fetch if id exists
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-8">
        Error: {error.message || "Something went wrong"}
      </div>
    );
  if (!data || typeof data !== "object")
    return <div className="text-center py-8">No post found.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Post details (ID: {id})</h1>
      <p>
        <strong className="font-medium">ID:</strong> {data.id}
      </p>
      <p>
        <strong className="font-medium">Title:</strong> {data.title}
      </p>
      <p>
        <strong className="font-medium">Body:</strong> {data.body}
      </p>

      <NavLink to="/rq">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go Back
        </button>
      </NavLink>
    </div>
  );
}
