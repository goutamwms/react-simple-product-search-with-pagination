import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productsApi';
import { Product } from '../types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  /* this is an alternative way to handle async calls in useEffect with abort controller, but it has some issues with state updates after unmounting
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
        try {
        const response = await fetch(url, {
            signal: controller.signal,
        });

        const data = await response.json();
        setProducts(data);
        } catch (err) {
        if (err.name !== 'AbortError') {
            setError('Unable to load products');
        }
        }
    }

    load();

    return () => controller.abort();
    }, []); 
  */
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchProducts();
        if (active) setProducts(data);
      } catch (err) {
        if (active) setError('Unable to load products');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
