import React, { useEffect, useState } from "react";
import { fetchPost } from "../api/api";

export default function FetchOld() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPostsData = async () => {
    try {
      const data = await fetchPost();
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error: Something went wrong
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Posts</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts.map((post) => {
          const { id, title, body } = post;
          return (
            <li
              key={id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
              <p className="text-gray-700 mt-2">{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
