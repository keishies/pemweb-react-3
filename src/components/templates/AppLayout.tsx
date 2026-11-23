import { Outlet } from 'react-router'
import Navbar from '../organisms/Navbar'

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
