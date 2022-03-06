// import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

import { useState, useCallback, SetStateAction, Dispatch, ChangeEvent } from 'react';

// type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

// const useInput = <T>(initialData: T): ReturnTypes<T> => {
//   const [value, setValue] = useState(initialData);
//   const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     setValue((e.target.value as unknown) as T);
//   }, []);
//   return [value, handler, setValue];
// };

// export default useInput;

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>]

const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T)
  }, [])
  return [value, handler, setValue]
}

export default useInput