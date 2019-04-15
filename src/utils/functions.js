// @flow
export function chain(...fns) {
  return (...args) => {
    fns.forEach(fn => fn(...args));
  };
}

export function noop() {}
