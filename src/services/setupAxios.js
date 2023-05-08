import axios from 'axios';

const CORE_API = import.meta.env.VITE_PUBLIC_API_BASE_URL;

axios.defaults.headers.common['Accept'] = 'application/json';

// const addInterceptor = (instant) => {
  //add auth later
//   return instant
// }

const createInstance = (api) => {
  return axios.create({
    baseURL: api,
  });
}

export const instanceCoreApi = createInstance(CORE_API);

export default function setupAxiosDefault() {
  axios.defaults.baseURL = CORE_API;
  // addInterceptor(axios);
}