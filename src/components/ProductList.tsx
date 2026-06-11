import { Product } from '../types/product';
import ProductCard from './ProductCard';

export default function ProductList({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
