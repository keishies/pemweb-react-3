import { Navigate, Route, Routes } from 'react-router'
import ProductsPage from './components/pages/ProductsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  )
}

export default App
