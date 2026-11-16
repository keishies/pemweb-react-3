interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
}

function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Cari nama produk..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="search-bar__count">{resultCount} produk</span>
    </div>
  )
}

export default SearchBar