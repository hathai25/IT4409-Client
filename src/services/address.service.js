import {instanceCoreApi} from "./setupAxios.js";
import {ADDRESS_API} from "./apis/index.js";

export const getUserAddress = async () => {
  return instanceCoreApi.get(ADDRESS_API.GET_USER_ADDRESS, {
    baseURL: 'http://localhost:3001',
  })
}


export const addAddress = (data) => {
  return instanceCoreApi.post(ADDRESS_API.ADD_ADDRESS, data, {
    baseURL: 'http://localhost:3001',
  })
}

export const setDefaultAddress = (id) => {
  return instanceCoreApi.patch(ADDRESS_API.SET_DEFAULT_ADDRESS.replace(':id', id))
}