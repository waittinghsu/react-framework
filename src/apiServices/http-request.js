import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    // 过滤 undefined 的参数
    Object.keys(config.params || {}).forEach((key) => {
      if (config.params[key] === undefined) {
        delete config.params[key];
      }
    });
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    if (status !== 200 || (data && data.code !== 0)) {
      return Promise.reject(data);
    }
    return data;
  },
  (error) => Promise.reject(error)
);

export default instance;
