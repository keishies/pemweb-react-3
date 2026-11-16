interface PageHeaderProps {
  onAddClick: () => void
}

function PageHeader({ onAddClick }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1>Manajemen Produk</h1>
      <p>Kelola daftar produk dan harga dalam satu tempat.</p>
      <button onClick={onAddClick}>+ Tambah Produk</button>
    </header>
  )
}

export default PageHeader
