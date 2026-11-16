import { useState } from 'react'
import type { FormEvent } from 'react'

interface ProductFormModalProps {
  onSubmit: (data: { name: string; price: number }) => void
  onClose: () => void
}

function ProductFormModal({ onSubmit, onClose }: ProductFormModalProps) {
  const [name, setName] = useState('')
  const [priceInput, setPriceInput] = useState('')
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
        <h2>Tambah Produk</h2>
        <p>Masukkan informasi produk baru.</p>
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
          <button type="submit">Simpan Produk</button>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal
