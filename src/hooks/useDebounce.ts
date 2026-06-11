import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300) {
  const [d, setD] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setD(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return d;
}
