import { useState } from 'react';
import { Certificate } from '../types/Certificate';

export const useLocalStorage = (key: string, initialValue: Certificate[]) => {
  const getKey = localStorage.getItem(key);
  const [storValue, setStorValue] = useState(() => {
    try {
      if (getKey !== null) {
        return JSON.parse(getKey) || '';
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: Certificate[] | ((val: Certificate[]) => Certificate[])) => {
    const selectedValue = value instanceof Function ? value(storValue) : value;

    setStorValue(selectedValue);
    if (key) {
      localStorage.setItem(key, JSON.stringify(selectedValue));
    }
  };

  return [storValue, save];
};
