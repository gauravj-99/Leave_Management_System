import axios from "axios";

const API = axios.create({
  baseURL: "http://leavemanagementsystem-production-cfa4.up.railway.app/api/auth"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers = req.headers || {};
    req.headers["Authorization"] = `Bearer ${token}`;
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
    const message = err.response?.data?.message || err.response?.data?.error || err.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export default API;
export const handleApiError = (error) => {
  return error.message || "An error occurred. Please try again.";
};