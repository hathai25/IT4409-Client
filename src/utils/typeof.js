export function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

export function isPromise(value) {
  return value instanceof Promise;
}

export function isExistKey(object, key) {
  // eslint-disable-next-line no-prototype-builtins
  return isObject(object) && object.hasOwnProperty(key);
}

export function isError(value) {
  return value instanceof Error && typeof value.message !== 'undefined';
}