import {isError, isExistKey} from "./typeof.js";

export const isErrorResponse = (response) => {
  return !(
    !isExistKey(response, 'status') ||
    response.status === 0 ||
    response.status === 200
  );
};

export const getMessageResponse = (response) => {
  console.log({response})
  if (isError(response)) {
    try {
      return JSON.parse(response.message).message;
    } catch (e) {
      console.log(e);
    }
  }

  if (response && (isErrorResponse(response) || isError(response))) {
    return response.message || '';
  } else {
    return '';
  }
};

export const getCodeResponse = (response) => {
  if (isError(response)) {
    try {
      return JSON.parse(response.message).status;
    } catch (e) {
      console.log(e);
    }
  }

  return response?.status || response?.data?.status;
};

export const getResultResponse = (response) => {
  return response;
};