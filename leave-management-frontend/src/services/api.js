import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    const message = err.response?.data?.message || err.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export default API;
export const handleApiError = (error) => {
  return error.message || "An error occurred. Please try again.";
};