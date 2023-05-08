import {instanceCoreApi} from "./setupAxios.js";

export const registerUser = async (data) => {
  return instanceCoreApi.post('/auth/register', data, {
    baseURL: 'http://localhost:3001'
  })
}