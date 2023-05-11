import {instanceCoreApi} from "./setupAxios.js";

export const getMe = async () => {
  return instanceCoreApi.get('/auth/me', {
    baseURL: 'http://localhost:3001'
  })
}