import { memo } from 'react';
import { Product } from '../types/product';

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <strong>${product.price}</strong>
    </article>
  );
}

export default memo(ProductCard);
