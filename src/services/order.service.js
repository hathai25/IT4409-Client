import {instanceCoreApi} from "./setupAxios.js";
import {ORDER_API} from "./apis/index.js";

export const createOrder = async (data) => {
  return instanceCoreApi.post(ORDER_API.CREATE_ORDER, data);
}

export const getOrderByStatus = async (status) => {
  return instanceCoreApi.get(`${ORDER_API.GET_ORDER_BY_STATUS}${status}`);
}

export const getOrderByDetail = async (id) => {
  return instanceCoreApi.get(ORDER_API.GET_ORDER_BY_ID.replace(':id', id));
}

export const cancelOrder = async (id) => {
  return instanceCoreApi.patch(ORDER_API.CANCEL_ORDER.replace(':id', id));
}

export const receiveOrder = async (id) => {
  return instanceCoreApi.patch(ORDER_API.RECEIVE_ORDER.replace(':id', id));
}