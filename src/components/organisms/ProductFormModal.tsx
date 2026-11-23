import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Product } from '../../types/product'
import Button from '../atoms/Button'

interface ProductFormModalProps {
  mode: 'add' | 'edit'
  product?: Product
  onSubmit: (data: { name: string; price: number }) => void | Promise<void>
  onClose: () => void
}

function ProductFormModal({ mode, product, onSubmit, onClose }: ProductFormModalProps) {
  const [name, setName] = useState(product?.name ?? '')
  const [priceInput, setPriceInput] = useState(product ? String(product.price) : '')
  const [errors, setErrors] = useState({ name: false, price: false })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const isNameValid = name.trim() !== ''
    const price = Number(priceInput)
    const isPriceValid =
      priceInput.trim() !== '' && Number.isInteger(price) && price > 0

    setErrors({ name: !isNameValid, price: !isPriceValid })

    if (!isNameValid || !isPriceValid) {
      return
    }

    setSubmitError(null)
    setIsSubmitting(true)
    try {
      await onSubmit({ name: name.trim(), price })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Terjadi kesalahan.')
      setIsSubmitting(false)
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
          ×
        </button>
        <h2 className="mb-1 pr-7 text-xl font-bold">{mode === 'add' ? 'Tambah Produk' : 'Edit Produk'}</h2>
        <p className="text-sm text-gray-500">
          {mode === 'add'
            ? 'Masukkan informasi produk baru.'
            : 'Perbarui informasi produk yang dipilih.'}
        </p>
        {mode === 'edit' && product && (
          <p className="text-xs text-gray-500">ID: {product.id}</p>
        )}
        <form className="mt-4 grid grid-cols-2 gap-3.5" onSubmit={handleSubmit}>
          <label className="col-span-2 block text-sm font-semibold" htmlFor="product-name">Nama Produk</label>
          <input
            className="col-span-2 mt-1.5 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-normal text-gray-900 outline-none focus:border-brand focus:ring-3 focus:ring-brand/15"
            id="product-name"
            type="text"
            placeholder="Contoh: Pulpen"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && (
            <p className="col-span-2 text-xs text-red-600">Nama produk tidak boleh kosong.</p>
          )}

          <label className="col-span-2 block text-sm font-semibold" htmlFor="product-price">Harga (Rp)</label>
          <input
            className="col-span-2 mt-1.5 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-normal text-gray-900 outline-none focus:border-brand focus:ring-3 focus:ring-brand/15"
            id="product-price"
            type="text"
            inputMode="numeric"
            placeholder="Contoh: 5000"
            value={priceInput}
            onChange={(event) => setPriceInput(event.target.value)}
          />
          <p className={errors.price ? 'col-span-2 text-xs text-red-600' : 'col-span-2 text-xs text-gray-500'}>
            Harga harus lebih dari 0.
          </p>

          {submitError !== null && <p className="col-span-2 text-xs text-red-600">{submitError}</p>}
          <Button type="button" variant="outline" className="mt-1.5 w-full" onClick={onClose}>Batal</Button>
          <Button type="submit" className="mt-1.5 w-full" disabled={isSubmitting}>
            {mode === 'add' ? 'Simpan Produk' : 'Simpan Perubahan'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal
