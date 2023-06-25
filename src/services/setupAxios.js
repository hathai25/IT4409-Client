import axios from 'axios';
import {notification} from "antd";

const CORE_API = import.meta.env.VITE_PUBLIC_API_BASE_URL;

axios.defaults.headers.common['Accept'] = 'application/json';

const addInterceptor = (instant) => {
  instant.interceptors.request.use(
    (config) => {
      if (!config?.headers?.Authorization) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          config.headers.Authorization = '';
        }
      }
      return config;
    },
    (err) => Promise.reject(err),
  );

  instant.interceptors.response.use(
    async (response) => {
      const {code} = response
      if (code === 401 || (code === 500 && !response.config.headers.Authorization)) {
        localStorage.clear()
        notification.error({
          message: 'Phiên đăng nhập hết hạn',
          description: 'Vui lòng đăng nhập lại',
        })
      }
      return response;
    },
    (err) => {
      if (err.response?.status === 401) {
        localStorage.clear()
        notification.error({
          message: 'Phiên đăng nhập hết hạn',
          description: 'Vui lòng đăng nhập lại',
        })
        window.location.href = '/'
      }
      return Promise.reject(err)
    }
  )

  return instant
}

const createInstance = (api) => {
  const instant = axios.create({
    baseURL: api,
  });

  addInterceptor(instant);

  return instant;
}

export const instanceCoreApi = createInstance(CORE_API);

export default function setupAxiosDefault() {
  axios.defaults.baseURL = CORE_API;
  addInterceptor(axios);
}