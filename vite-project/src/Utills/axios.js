import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://messenger-r42b.onrender.com//api",
  withCredentials: true,
})

