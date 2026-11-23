# Tugas 4: Manajemen Produk dengan React Router, Tailwind CSS, dan Backend

Nama/NRP: Keisya Dira Anugerah/5027251055

Frontend React + TypeScript (Vite) untuk manajemen produk. Data diambil dan disimpan lewat
backend Express + Prisma + PostgreSQL (Neon).

## Fitur

- Daftar, tambah, edit, hapus, dan cari produk (data dari backend)
- Halaman detail produk di `/products/:id`
- Halaman 404 untuk URL yang tidak terdaftar
- Styling dengan Tailwind CSS, responsif 1, 2, dan 3 kolom

## Menjalankan

Backend dan frontend berada di repository berbeda dan harus berjalan bersamaan.

### 1. Backend

Repository: [repo-backend](https://github.com/keishies/pemweb-express-db)

```bash
git clone https://github.com/keishies/pemweb-express-db
cd <nama-folder-backend>
npm install
```

Buat file `.env`:

```env
DATABASE_URL="connection string Neon (pooled)"
DATABASE_URL_UNPOOLED="connection string Neon (direct)"
PORT=3000
```

```bash
npx prisma migrate dev
npm run dev
```

Backend berjalan di `http://localhost:3000`.

### 2. Frontend

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`. Permintaan ke `/api/*` diteruskan oleh Vite ke
`http://localhost:3000` (lihat `vite.config.ts`).

## Struktur

```
src/
├── api/products.ts          # pemanggilan API
├── types/product.ts
├── utils/formatPrice.ts
├── components/
│   ├── atoms/               # Button
│   ├── molecules/           # ProductCard, SearchBar, PageHeader
│   ├── organisms/           # ProductList, ProductFormModal, DeleteConfirmModal, Navbar
│   ├── templates/           # AppLayout (Navbar + Outlet)
│   └── pages/               # ProductsPage, ProductDetailPage, NotFoundPage
├── App.tsx                  # daftar route
└── main.tsx                 # BrowserRouter
```

## Route

| Path | Halaman |
|---|---|
| `/` | Dialihkan ke `/products` |
| `/products` | Daftar produk |
| `/products/:id` | Detail produk |
| `*` | 404 |