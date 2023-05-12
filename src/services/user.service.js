import {instanceCoreApi} from "./setupAxios.js";
import {AUTH_API, USER_API} from "./apis/index.js";

export const getMe = async () => {
  return instanceCoreApi.get(AUTH_API.GET_ME, {
    baseURL: 'http://localhost:3001'
  })
}

export const getUserInfo = async () => {
  return instanceCoreApi.get(USER_API.GET_USER_INFO, {
    baseURL: 'http://localhost:3001'
  })
}

export const updateUserInfo = async (data) => {
  return instanceCoreApi.patch(USER_API.GET_USER_INFO, data, {
    baseURL: 'http://localhost:3001'
  })
}