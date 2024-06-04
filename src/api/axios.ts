import axios from 'axios';
import Config from 'react-native-config';

// AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL: Config.API_URL + 'api',
});

export function setToken(token: string) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function removeToken() {
  axiosInstance.defaults.headers.common['Authorization'] = null
}

export default axiosInstance;
