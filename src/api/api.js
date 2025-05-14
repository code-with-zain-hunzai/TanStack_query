import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPost = async (num) => {
  try {
    const res = await api.get(`/posts?_start=${num}&_limit=6`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// Fetch a single post by ID

export const fetchInvPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

// delete a post by ID
export const deletePost = async (id) => {
  return api.delete(`/posts/${id}`);
};

// update apost by ID
export const updatePost = async (id) => {
  return api.put(`/posts/${id}`, { title: "I have Updated" });
};

// infinte scroll

export const fetchInfinitePost = async ({ pageParam = 0 }) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${pageParam}&_limit=10`
    );
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
