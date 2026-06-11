export default function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      aria-label="Category filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  );
}
