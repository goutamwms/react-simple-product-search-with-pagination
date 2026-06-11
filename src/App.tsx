import { ErrorBoundary } from './components/ErrorBoundary';
import ProductSearchPage from './pages/ProductSearchPage';

export default function App() {
  return (
    <ErrorBoundary>
      <ProductSearchPage />
    </ErrorBoundary>
  );
}
