import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { Link } from 'react-router'
import Button from '../atoms/Button'

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <article className="rounded-[10px] border border-gray-200 bg-white p-4 shadow-sm">
      <p className="mb-2 text-[11px] text-gray-500">ID: {product.id}</p>
      <h3 className="mb-1 text-lg font-bold">{product.name}</h3>
      <p className="mb-2 text-lg font-bold text-brand">{formatPrice(product.price)}</p>
      <Link to={`/products/${product.id}`} className="mb-3 inline-block text-xs font-semibold text-brand hover:underline">Detail</Link>
      <div className="flex gap-2.5">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(product)}>Edit</Button>
        <Button variant="dangerOutline" size="sm" className="flex-1" onClick={() => onDelete(product)}>Hapus</Button>
      </div>
    </article>
  )
}

export default ProductCard
