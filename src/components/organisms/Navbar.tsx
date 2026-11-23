import { NavLink } from 'react-router'

function Navbar() {
  return (
    <nav>
      <span>Manajemen Produk</span>
      <NavLink to="/products">Produk</NavLink>
    </nav>
  )
}

export default Navbar
