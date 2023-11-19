import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3500',
    withCredentials: true
  });
  export default axiosInstance;