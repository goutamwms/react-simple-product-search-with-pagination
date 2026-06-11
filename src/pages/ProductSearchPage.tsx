import { lazy, Suspense, useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { filterProducts, paginate } from '../utils/productUtils';

const ProductList = lazy(() => import('../components/ProductList'));

const PAGE_SIZE = 10;

export default function ProductSearchPage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const deferredSearch = useDeferredValue(search);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(
    () => filterProducts(products, deferredSearch, category),
    [products, deferredSearch, category]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const visible = useMemo(
    () => paginate(filtered, page, PAGE_SIZE),
    [filtered, page]
  );

  const handleSearch = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
  }, []);

  const handleCategory = useCallback((v: string) => {
    setCategory(v);
    setPage(1);
  }, []);

  if (loading) return <Loader />;
  if (error) return <p role="alert">{error}</p>;

  return (
    <main>
      <h1>Product Search</h1>
      <SearchBar value={search} onChange={handleSearch} />
      <CategoryFilter
        categories={categories}
        value={category}
        onChange={handleCategory}
      />

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <Suspense fallback={<Loader />}>
          <ProductList products={visible} />
        </Suspense>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}
