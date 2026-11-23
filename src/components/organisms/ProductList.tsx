import type { Product } from '../../types/product'
import ProductCard from '../molecules/ProductCard'

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProductList
