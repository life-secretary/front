import axios from 'axios';

// AXIOS INSTANCE
const instance = axios.create({
  baseURL: '',
});

export {instance as API};
