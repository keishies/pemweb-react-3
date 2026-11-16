import { useState } from 'react'
import type { Product } from './types/product'
import { initialProducts } from './data/products'
import ProductList from './components/ProductList'
import PageHeader from './components/PageHeader'
import ProductFormModal from './components/ProductFormModal'

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  function handleAdd(data: { name: string; price: number }) {
    const largestId = products.reduce(
      (largest, product) => Math.max(largest, product.id),
      0,
    )

    setProducts([...products, { id: largestId + 1, ...data }])
    setIsAddOpen(false)
  }

  function handleEdit(data: { name: string; price: number }) {
    if (editingProduct === null) {
      return
    }

    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...data } : product,
      ),
    )
    setEditingProduct(null)
  }

  function handleOpenAdd() {
    setEditingProduct(null)
    setIsAddOpen(true)
  }

  function handleOpenEdit(product: Product) {
    setIsAddOpen(false)
    setEditingProduct(product)
  }

  return (
    <>
      <PageHeader
        onAddClick={handleOpenAdd}
      />
      <ProductList
        products={products}
        onEdit={handleOpenEdit}
        onDelete={() => {}}
      />
      {isAddOpen && (
        <ProductFormModal
          mode="add"
          onSubmit={handleAdd}
          onClose={() => setIsAddOpen(false)}
        />
      )}
      {editingProduct !== null && (
        <ProductFormModal
          key={editingProduct.id}
          mode="edit"
          product={editingProduct}
          onSubmit={handleEdit}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </>
  )
}

export default App



