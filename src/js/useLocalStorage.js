/**
 * localStorageに値を保存するフック
 * 
 * const [var, setVar] = useLocalStorage(key, initValue);
 */
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initValue) => {
  const savedValue = localStorage.getItem(key);
  const [variable, setter] = useState(
    // initValueとして関数が渡された時は実行した結果を値とする．
    savedValue === null ? (typeof initValue === 'function' ? initValue() : initValue) : JSON.parse(savedValue));

  useEffect(() => {
    // 値が変わった時に，localStorageにも保存する．
    localStorage.setItem(key, JSON.stringify(variable));
  }, [variable]);

  return [variable, setter];
};
