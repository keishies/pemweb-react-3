import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { Link } from 'react-router'

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <article className="product-card">
      <p className="product-card__id">ID: {product.id}</p>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">{formatPrice(product.price)}</p>
      <Link to={`/products/${product.id}`}>Detail</Link>
      <div className="product-card__actions">
        <button onClick={() => onEdit(product)}>Edit</button>
        <button onClick={() => onDelete(product)}>Hapus</button>
      </div>
    </article>
  )
}

export default ProductCard
