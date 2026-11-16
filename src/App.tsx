import { useState } from 'react'
import type { Product } from './types/product'
import { initialProducts } from './data/products'
import ProductList from './components/ProductList'
import PageHeader from './components/PageHeader'
import ProductFormModal from './components/ProductFormModal'

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddOpen, setIsAddOpen] = useState(false)

  function handleAdd(data: { name: string; price: number }) {
    const largestId = products.reduce(
      (largest, product) => Math.max(largest, product.id),
      0,
    )

    setProducts([...products, { id: largestId + 1, ...data }])
    setIsAddOpen(false)
  }

  return (
    <>
      <PageHeader onAddClick={() => setIsAddOpen(true)} />
      <ProductList
        products={products}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      {isAddOpen && (
        <ProductFormModal
          onSubmit={handleAdd}
          onClose={() => setIsAddOpen(false)}
        />
      )}
    </>
  )
}

export default App
