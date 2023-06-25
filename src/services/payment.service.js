import {instanceCoreApi} from "./setupAxios.js";
import {PAYMENT_API} from "./apis/index.js";

export const getVnpayUrl = (amount, orderId) => {
    return instanceCoreApi.post(PAYMENT_API.GET_VNPAY_URL, {amount, orderId})
}

