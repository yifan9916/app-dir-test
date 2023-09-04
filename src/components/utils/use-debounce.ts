import { useEffect } from 'react';

export const useDebounce = <T>(
  input: T,
  cb: (i: T) => void,
  debounce: number = 500,
) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!input) return;

      cb(input);
    }, debounce);

    return () => {
      clearTimeout(timerId);
    };
  }, [input, cb, debounce]);
};
