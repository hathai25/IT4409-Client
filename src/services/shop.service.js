import {instanceCoreApi} from "./setupAxios.js";
import {SHOP_API} from "./apis/index.js";

export const getAllProducts = async () => {
  return instanceCoreApi.get(SHOP_API.GET_LIST_PRODUCT);
}

export const getProductDetail = async (id) => {
  return instanceCoreApi.get(SHOP_API.GET_PRODUCT_MEDIAS, {
    params: {productId: id}
  });
}

export const getCategory = async () => {
  return instanceCoreApi.get(SHOP_API.GET_CATEGORY);
}