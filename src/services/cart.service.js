import {instanceCoreApi} from "./setupAxios.js";
import {CART_API} from "./apis/index.js";

export const getUserCart = async () => {
  return instanceCoreApi.get(CART_API.GET_CART);
}

export const addToCart = async (number, itemId) => {
  return instanceCoreApi.post(CART_API.GET_CART, {
    number,
    itemId
  });
}

export const updateCart = async (id) => {
  return instanceCoreApi.patch(CART_API.UPDATE_CART.replace(':id', id));
}

export const deleteCartItem = async (id) => {
  return instanceCoreApi.delete(CART_API.UPDATE_CART.replace(':id', id));
}