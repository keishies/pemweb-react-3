import { useState } from 'react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/formatPrice'

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          aria-label="Tutup"
          onClick={onClose}
        >
          &times;
        </button>
        <svg
          className="modal__icon"
          width="32"
          height="32"
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
        <h2>Hapus Produk?</h2>
        <p>Produk yang dihapus tidak dapat dikembalikan.</p>
        <div className="delete-summary">
          <p className="delete-summary__id">ID: {product.id}</p>
          <p className="delete-summary__name">{product.name}</p>
          <p className="delete-summary__price">{formatPrice(product.price)}</p>
        </div>
        {deleteError !== null && <p className="form-error">{deleteError}</p>}
        <div className="modal__actions">
          <button type="button" onClick={onClose}>Batal</button>
          <button type="button" className="button-danger" onClick={handleConfirm} disabled={isDeleting}>
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
