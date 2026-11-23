import Button from '../atoms/Button'

interface PageHeaderProps {
  onAddClick: () => void
}

function PageHeader({ onAddClick }: PageHeaderProps) {
  return (
    <header className="mb-7 grid grid-cols-[1fr_auto] items-center">
      <h1 className="col-start-1 mb-1 text-[28px] font-extrabold tracking-tight">Manajemen Produk</h1>
      <p className="col-start-1 text-sm text-gray-500">Kelola daftar produk dan harga dalam satu tempat.</p>
      <Button size="lg" className="col-start-2 row-span-2 row-start-1" onClick={onAddClick}>
        + Tambah Produk
      </Button>
    </header>
  )
}

export default PageHeader
