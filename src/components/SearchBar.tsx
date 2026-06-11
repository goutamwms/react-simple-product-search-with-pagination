export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      aria-label="Search products"
      type="search"
      value={value}
      placeholder="Search products..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
