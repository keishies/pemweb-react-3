import { useState } from 'react'
import type { Product } from './types/product'
import { initialProducts } from './data/products'
import ProductList from './components/ProductList'

function App() {
  const [products] = useState<Product[]>(initialProducts)

  return (
    <>
      <h1>Manajemen Produk</h1>
      <ProductList
        products={products}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </>
  )
}

export default App
