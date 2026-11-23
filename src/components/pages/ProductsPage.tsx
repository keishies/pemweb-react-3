import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { getProducts } from '../../api/products'
import { createProduct, deleteProduct, updateProduct } from '../../api/products'
import ProductList from '../organisms/ProductList'
import PageHeader from '../molecules/PageHeader'
import ProductFormModal from '../organisms/ProductFormModal'
import DeleteConfirmModal from '../organisms/DeleteConfirmModal'
import SearchBar from '../molecules/SearchBar'

function ProductsPage() {
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

  async function handleAdd(data: { name: string; price: number }) {
    const created = await createProduct(data)
    setProducts((current) => [...current, created])
    setIsAddOpen(false)
  }

  async function handleEdit(data: { name: string; price: number }) {
    if (editingProduct === null) return
    const updated = await updateProduct(editingProduct.id, data)
    setProducts((current) =>
      current.map((product) => (product.id === updated.id ? updated : product)),
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

  async function handleDelete() {
    if (deletingProduct === null) return
    const idToDelete = deletingProduct.id
    await deleteProduct(idToDelete)
    setProducts((current) => current.filter((product) => product.id !== idToDelete))
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
        <p className="py-10 text-center text-gray-500">Memuat produk...</p>
      ) : loadError !== null ? (
        <p className="py-10 text-center text-red-600">{loadError}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="py-10 text-center text-gray-500">Produk tidak ditemukan.</p>
      ) : (
        <ProductList
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}
      {!isLoading && loadError === null && (
        <p className="mt-5 text-[13px] text-gray-500">
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

export default ProductsPage



