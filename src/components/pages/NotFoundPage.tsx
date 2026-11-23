import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
      <Link to="/products">Kembali ke daftar produk</Link>
    </section>
  )
}

export default NotFoundPage
