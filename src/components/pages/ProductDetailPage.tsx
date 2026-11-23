import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import type { Product } from '../../types/product'
import { getProduct } from '../../api/products'
import { formatPrice } from '../../utils/formatPrice'

type LoadResult = { id: string; product: Product | null; error: string | null }

function ProductDetailPage() {
  const { id = '' } = useParams()
  const [result, setResult] = useState<LoadResult | null>(null)

  useEffect(() => {
    let ignore = false
    getProduct(id)
      .then((product) => {
        if (!ignore) setResult({ id, product, error: null })
      })
      .catch((error: Error) => {
        if (!ignore) setResult({ id, product: null, error: error.message })
      })
    return () => {
      ignore = true
    }
  }, [id])

  return (
    <section>
      {result === null || result.id !== id ? (
        <p className="mt-6 text-gray-500">Memuat produk...</p>
      ) : result.product === null ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{result.error}</p>
      ) : (
        <div className="mt-6 max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs text-gray-500">ID: {result.product.id}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">{result.product.name}</h1>
          <p className="mt-2 text-2xl font-bold text-brand">{formatPrice(result.product.price)}</p>
        </div>
      )}
      <Link
        to="/products"
        className="mt-6 inline-block rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Kembali ke daftar produk
      </Link>
    </section>
  )
}

export default ProductDetailPage
