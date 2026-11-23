import { useState } from 'react'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../atoms/Button'

interface DeleteConfirmModalProps {
  product: Product
  onConfirm: () => void | Promise<void>
  onClose: () => void
}

function DeleteConfirmModal({ product, onConfirm, onClose }: DeleteConfirmModalProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleConfirm() {
    setDeleteError(null)
    setIsDeleting(true)
    try {
      await onConfirm()
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Terjadi kesalahan.')
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4" onClick={onClose}>
      <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-[400px] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-md text-[22px] leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label="Tutup"
          onClick={onClose}
        >
          &times;
        </button>
        <svg
          className="mx-auto mb-3 box-content block rounded-xl bg-red-100 p-3 text-red-600"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
        <h2 className="mb-1.5 text-center text-xl font-bold">Hapus Produk?</h2>
        <p className="text-center text-sm text-gray-500">Produk yang dihapus tidak dapat dikembalikan.</p>
        <div className="mt-4 rounded-lg border border-gray-200 px-3.5 py-3">
          <p className="text-[11px] text-gray-500">ID: {product.id}</p>
          <p className="mt-1 text-base font-bold text-gray-900">{product.name}</p>
          <p className="mt-0.5 text-base font-bold text-brand">{formatPrice(product.price)}</p>
        </div>
        {deleteError !== null && <p className="mt-3 text-xs text-red-600">{deleteError}</p>}
        <div className="mt-5 flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Batal</Button>
          <Button type="button" variant="danger" className="flex-1" onClick={handleConfirm} disabled={isDeleting}>
            Hapus Produk
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
