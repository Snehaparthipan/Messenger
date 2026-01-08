import axios from 'axios'

export const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
baseURL:"https://messenger-2-yb82.onrender.com/api",
  withCredentials: true
})
