import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL: "https://messenger-neon-six.vercel.app",
    withCredentials: true
})