import { NavLink } from 'react-router'

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-3.5">
        <span className="text-base font-extrabold tracking-tight">Manajemen Produk</span>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? 'text-sm font-semibold text-brand'
              : 'text-sm font-medium text-gray-500 hover:text-gray-900'
          }
        >
          Produk
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
