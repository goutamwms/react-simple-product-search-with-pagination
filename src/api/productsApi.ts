import { Product } from '../types/product';

export async function fetchProducts(): Promise<Product[]> {
  const r = await fetch('https://dummyjson.com/products?limit=100');
  if (!r.ok) throw new Error('Failed');
  const d = await r.json();
  return d.products;
}
