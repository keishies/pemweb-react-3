import { useState } from 'react'
import type { Product } from './types/product'
import { initialProducts } from './data/products'
import ProductList from './components/ProductList'
import PageHeader from './components/PageHeader'

function App() {
  const [products] = useState<Product[]>(initialProducts)

  return (
    <>
      <PageHeader onAddClick={() => {}} />
      <ProductList
        products={products}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </>
  )
}

export default App
