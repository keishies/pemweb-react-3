import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight text-brand">404</h1>
      <p className="mt-3 text-gray-500">Halaman tidak ditemukan.</p>
      <Link
        to="/products"
        className="mt-6 inline-block rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Kembali ke daftar produk
      </Link>
    </section>
  )
}

export default NotFoundPage
