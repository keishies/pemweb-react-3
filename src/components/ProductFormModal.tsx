import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Product } from '../types/product'

interface ProductFormModalProps {
  mode: 'add' | 'edit'
  product?: Product
  onSubmit: (data: { name: string; price: number }) => void
  onClose: () => void
}

function ProductFormModal({ mode, product, onSubmit, onClose }: ProductFormModalProps) {
  const [name, setName] = useState(product?.name ?? '')
  const [priceInput, setPriceInput] = useState(product ? String(product.price) : '')
  const [errors, setErrors] = useState({ name: false, price: false })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const isNameValid = name.trim() !== ''
    const price = Number(priceInput)
    const isPriceValid =
      priceInput.trim() !== '' && Number.isInteger(price) && price > 0

    setErrors({ name: !isNameValid, price: !isPriceValid })

    if (!isNameValid || !isPriceValid) {
      return
    }

    onSubmit({ name: name.trim(), price })
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
          ×
        </button>
        <h2>{mode === 'add' ? 'Tambah Produk' : 'Edit Produk'}</h2>
        <p>
          {mode === 'add'
            ? 'Masukkan informasi produk baru.'
            : 'Perbarui informasi produk yang dipilih.'}
        </p>
        {mode === 'edit' && product && (
          <p className="modal__id">ID: {product.id}</p>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="product-name">Nama Produk</label>
          <input
            id="product-name"
            type="text"
            placeholder="Contoh: Pulpen"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && (
            <p className="form-error">Nama produk tidak boleh kosong.</p>
          )}

          <label htmlFor="product-price">Harga (Rp)</label>
          <input
            id="product-price"
            type="text"
            inputMode="numeric"
            placeholder="Contoh: 5000"
            value={priceInput}
            onChange={(event) => setPriceInput(event.target.value)}
          />
          <p className={errors.price ? 'form-hint form-hint--error' : 'form-hint'}>
            Harga harus lebih dari 0.
          </p>

          <button type="button" onClick={onClose}>Batal</button>
          <button type="submit">
            {mode === 'add' ? 'Simpan Produk' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal
