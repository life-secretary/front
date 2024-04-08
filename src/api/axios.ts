import axios from 'axios';

// AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL: 'https://www.life-secretary.com/api',
});

export default axiosInstance;
