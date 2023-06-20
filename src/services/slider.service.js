import {instanceCoreApi} from "./setupAxios.js";
import {BANNER_API} from "./apis/index.js";

export const getAllSliders = () => {
  return instanceCoreApi.get(BANNER_API.GET_BANNER);
}