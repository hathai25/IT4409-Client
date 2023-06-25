export const SHOP_API = {
  GET_LIST_PRODUCT: '/products',
  GET_PRODUCT_DETAIL: '/products/:id',
  GET_PRODUCT_MEDIAS: '/product-details',
  GET_CATEGORY: '/categories',
}

export const AUTH_API = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GET_ME: '/auth/me',
}

export const USER_API = {
  GET_USER_INFO: '/users/profile',
}

export const CART_API = {
  GET_CART: '/cart-items',
  UPDATE_CART: '/cart-items/:id',
}

export const ADDRESS_API = {
  ADD_ADDRESS: '/users/address',
  GET_USER_ADDRESS: '/users/address',
  SET_DEFAULT_ADDRESS: '/users/address/default/:id',
}

export const ORDER_API = {
  CREATE_ORDER: '/orders',
  GET_ORDER_BY_STATUS: '/orders?status=',
  GET_ORDER_BY_ID: '/orders/:id',
  CANCEL_ORDER: '/orders/user/cancel/:id',
  RECEIVE_ORDER: '/orders/received/:id',
}

export const BANNER_API = {
  GET_BANNER: '/sliders',
}

export const PAYMENT_API = {
  GET_VNPAY_URL: '/transations/vnpay',
}