import {instanceCoreApi} from "./setupAxios.js";
import {ADDRESS_API} from "./apis/index.js";

export const addAddress = (data) => {
  return instanceCoreApi.post(ADDRESS_API.ADD_ADDRESS, data, {
    baseURL: 'http://localhost:3001',
  })
}
