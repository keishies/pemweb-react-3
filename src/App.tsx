import { useEffect, useState } from 'react'
import type { Product } from './types/product'
import { getProducts } from './api/products'
import ProductList from './components/ProductList'
import PageHeader from './components/PageHeader'
import ProductFormModal from './components/ProductFormModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import SearchBar from './components/SearchBar'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let ignore = false
    getProducts()
      .then((data) => {
        if (!ignore) setProducts(data)
      })
      .catch((error: Error) => {
        if (!ignore) setLoadError(error.message)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

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
    setDeletingProduct(null)
    setEditingProduct(null)
    setIsAddOpen(true)
  }

  function handleOpenEdit(product: Product) {
    setDeletingProduct(null)
    setIsAddOpen(false)
    setEditingProduct(product)
  }

  function handleOpenDelete(product: Product) {
    setIsAddOpen(false)
    setEditingProduct(null)
    setDeletingProduct(product)
  }

  function handleDelete() {
    if (deletingProduct === null) return
    const idToDelete = deletingProduct.id
    setProducts(products.filter((p) => p.id !== idToDelete))
    setDeletingProduct(null)
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  return (
    <>
      <PageHeader
        onAddClick={handleOpenAdd}
      />
      <SearchBar
        value={search}
        onChange={setSearch}
        resultCount={filteredProducts.length}
      />
      {isLoading ? (
        <p>Memuat produk...</p>
      ) : loadError !== null ? (
        <p>{loadError}</p>
      ) : filteredProducts.length === 0 ? (
        <p>Produk tidak ditemukan.</p>
      ) : (
        <ProductList
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}
      {!isLoading && loadError === null && (
        <p className="product-summary">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </p>
      )}
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
      {deletingProduct !== null && (
        <DeleteConfirmModal
          product={deletingProduct}
          onConfirm={handleDelete}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </>
  )
}

export default App



