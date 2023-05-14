import {instanceCoreApi} from "./setupAxios.js";
import {CART_API} from "./apis/index.js";

export const getUserCart = async (id) => {
  return instanceCoreApi.get(CART_API.GET_CART.replace(':id', id));
}

export const addToCart = async (id, data) => {
  return instanceCoreApi.put(CART_API.GET_CART.replace(':id', id), {
    merge: 'true',
    products: [...data]
  });
}

export const deleteCart = async (data) => {
  return instanceCoreApi.delete(CART_API.GET_CART);
}