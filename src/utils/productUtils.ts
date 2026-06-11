import { Product } from '../types/product';

export const filterProducts = (
  products: Product[],
  search: string,
  category: string
) =>
  products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (!category || p.category === category)
  );

export const paginate = (items: Product[], page: number, size: number) =>
  items.slice((page - 1) * size, (page - 1) * size + size);
