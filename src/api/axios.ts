import axios from 'axios';
import Config from 'react-native-config';

// AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL: Config.API_URL + 'api',
});

export default axiosInstance;
