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
