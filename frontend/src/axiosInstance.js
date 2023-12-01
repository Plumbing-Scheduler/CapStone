import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://52.14.18.78:5000',
    withCredentials: true,
  });
  export default axiosInstance;