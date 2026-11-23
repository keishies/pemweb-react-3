interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
}

function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <div className="relative min-w-0 flex-1">
        <svg
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-3 pl-10 text-sm outline-none focus:border-brand focus:ring-3 focus:ring-brand/15"
          placeholder="Cari nama produk..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <span className="text-[13px] whitespace-nowrap text-gray-500">{resultCount} produk</span>
    </div>
  )
}

export default SearchBar
