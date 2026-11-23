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
      <Link to="/products">Kembali ke daftar produk</Link>
      {result === null || result.id !== id ? (
        <p>Memuat produk...</p>
      ) : result.product === null ? (
        <p>{result.error}</p>
      ) : (
        <div>
          <p>ID: {result.product.id}</p>
          <h1>{result.product.name}</h1>
          <p>{formatPrice(result.product.price)}</p>
        </div>
      )}
    </section>
  )
}

export default ProductDetailPage
