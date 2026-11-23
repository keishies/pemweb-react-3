import { Navigate, Route, Routes } from 'react-router'
import AppLayout from './components/templates/AppLayout'
import ProductsPage from './components/pages/ProductsPage'
import ProductDetailPage from './components/pages/ProductDetailPage'
import NotFoundPage from './components/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
