import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL: "https://messenger-r42b.onrender.com/api",
    withCredentials: true
})