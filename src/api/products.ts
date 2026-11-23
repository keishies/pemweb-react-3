import type { Product } from '../types/product'

const BASE_URL = '/api/products'

export type ProductInput = { name: string; price: number }

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(url, options)
  } catch {
    throw new Error('Tidak dapat terhubung ke server.')
  }

  const body: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      typeof body === 'object' &&
      body !== null &&
      'message' in body &&
      typeof body.message === 'string'
        ? body.message
        : 'Terjadi kesalahan pada server.'
    throw new Error(message)
  }

  return body as T
}

function jsonOptions(method: string, input: ProductInput): RequestInit {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>(BASE_URL)
}

export function getProduct(id: number | string): Promise<Product> {
  return request<Product>(`${BASE_URL}/${id}`)
}

export function createProduct(input: ProductInput): Promise<Product> {
  return request<Product>(BASE_URL, jsonOptions('POST', input))
}

export function updateProduct(id: number, input: ProductInput): Promise<Product> {
  return request<Product>(`${BASE_URL}/${id}`, jsonOptions('PUT', input))
}

export async function deleteProduct(id: number): Promise<void> {
  await request<unknown>(`${BASE_URL}/${id}`, { method: 'DELETE' })
}
