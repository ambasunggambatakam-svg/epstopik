# Panduan Setup Project & Dokumentasi

Projek ini merupakan aplikasi monorepo (menggunakan Turborepo) yang terbagi menjadi beberapa *apps* dan *packages*. Berikut adalah panduan lengkap untuk setup awal, pengelolaan database, serta dokumentasi struktur folder dan route yang tersedia.

---

## 1. Persiapan & Instalasi

### Prasyarat:
- **Node.js**: Versi `18` atau lebih baru.
- **Package Manager**: Menggunakan `npm` (versi 11+ sesuai di `package.json`).

### Langkah Instalasi:
1. Clone repositori ini.
2. Jalankan perintah instalasi di root directory:
   ```bash
   npm install
   ```
3. Konfigurasikan Environment Variables. Copy (atau buat) file `.env` di dalam folder `packages/database`, `apps/web`, dan `apps/api`. Setidaknya Anda memerlukan koneksi database:
   ```env
   # Di packages/database/.env
   DATABASE_URL="url_database_anda"
   ```
4. Push schema ke database dan generate client:
   ```bash
   npm run build
   # atau bisa masuk ke packages/database dan jalankan npm run db:push
   ```
5. Untuk menjalankan mode development (semua app secara bersamaan):
   ```bash
   npm run dev
   ```

---

## 2. Panduan Konfigurasi Database (Prisma)

Aplikasi ini menggunakan Prisma ORM. Secara default dikonfigurasi menggunakan **PostgreSQL** (`provider = "postgresql"` di `packages/database/prisma/schema.prisma`).

### Jika menggunakan Supabase (PostgreSQL):
1. Buat project baru di [Supabase](https://supabase.com).
2. Pergi ke bagian **Project Settings > Database**.
3. Copy **Connection String (URI)**.
4. Anda akan mendapatkan dua jenis koneksi: *Transaction (Pooler)* dan *Session (Direct)*. Sangat disarankan menggunakan Direct connection untuk migrasi (`prisma migrate`), dan connection pooler untuk query biasa.
5. Paste ke dalam `.env`:
   ```env
   DATABASE_URL="postgres://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
   DIRECT_URL="postgres://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
   ```
   *Catatan: Pastikan mengubah password.*

### Jika menggunakan Neon.tech (Serverless PostgreSQL):
1. Buat project baru di [Neon](https://neon.tech).
2. Copy connection string dari dashboard.
3. Neon sangat optimal untuk lingkungan serverless (seperti Vercel) karena koneksinya di-pool secara default.
4. Paste ke dalam `.env`:
   ```env
   DATABASE_URL="postgresql://[USER]:[PASSWORD]@[ENDPOINT].neon.tech/neondb?sslmode=require"
   ```

### Jika menggunakan MySQL (atau MariaDB):
Karena default schema memakai PostgreSQL, Anda harus melakukan sedikit modifikasi jika ingin migrasi ke MySQL:
1. Buka file `packages/database/prisma/schema.prisma`.
2. Ubah block datasource:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```
3. Sesuaikan URL di `.env`:
   ```env
   DATABASE_URL="mysql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE_NAME]"
   ```
4. **Penting!** Di PostgreSQL, Prisma mendukung native array (seperti `options String[]` di model `Question`). MySQL **tidak** mendukung native array untuk string. Anda harus mengubah tipe datanya menjadi `Json`, atau membuat tabel relasi (contoh: tabel `Option` yang berelasi One-to-Many ke `Question`).
   Ubah tipe data di `schema.prisma`:
   ```prisma
   // dari:
   options String[]
   // menjadi:
   options Json
   ```

---

## 3. Struktur Folder Monorepo (Komprehensif)

Proyek ini menggunakan **Turborepo** untuk manajemen monorepo. Berikut adalah struktur folder secara menyeluruh beserta penjelasannya:

```text
epstopik/
├── apps/                          # Folder untuk aplikasi utama (front-end & back-end)
│   ├── api/                       # Backend service (Fastify)
│   │   ├── src/
│   │   │   ├── plugins/           # Konfigurasi plugin Fastify (JWT, CORS, dll)
│   │   │   ├── routes/            # Kumpulan endpoint API
│   │   │   │   ├── admin/         # Endpoint CRUD untuk admin
│   │   │   │   ├── auth/          # Endpoint login, register, token refresh
│   │   │   │   ├── payment/       # Integrasi payment gateway (Doku webhook, dll)
│   │   │   │   ├── quiz/          # Endpoint terkait pengerjaan soal dan skor
│   │   │   │   └── user/          # Endpoint data profil dan progress user
│   │   │   ├── app.ts             # Registrasi core Fastify
│   │   │   └── index.ts           # Server entry point (bind port)
│   │   └── package.json           # Dependencies untuk backend
│   │
│   ├── web/                       # Frontend aplikasi (Next.js 14+ App Router)
│   │   ├── app/                   # Folder sistem routing Next.js
│   │   │   ├── (auth)/            # Route grup untuk Login & Register
│   │   │   ├── admin/             # Dashboard panel khusus Admin
│   │   │   ├── api/               # Next.js API Routes (BFF - Backend for Frontend)
│   │   │   ├── artikel/           # Modul blog & informasi
│   │   │   ├── dashboard/         # Halaman utama user setelah login
│   │   │   ├── kosakata/          # Modul hafalan kosakata Korea
│   │   │   ├── latihan-soal/      # Modul kuis/latihan singkat (Reading & Listening)
│   │   │   ├── materi/            # Modul pembelajaran teks/video
│   │   │   ├── simulasi-ujian/    # Ujian CBT terjadwal
│   │   │   ├── tryout/            # Modul tryout umum
│   │   │   ├── globals.css        # Styling global (Tailwind)
│   │   │   └── layout.tsx         # Root layout aplikasi (Provider, Meta tags)
│   │   ├── components/            # Komponen React yang reusable (Navbar, Footer, Button, dll)
│   │   ├── data/                  # Static data, constants, atau mock data
│   │   ├── lib/                   # Utility functions (format date, fetch helpers, dll)
│   │   ├── public/                # Asset statis (images, icons, fonts)
│   │   ├── types/                 # Definisi tipe global TypeScript untuk frontend
│   │   ├── next.config.js         # Konfigurasi Next.js
│   │   └── tailwind.config.js     # Konfigurasi utility class TailwindCSS
│   │
│   └── kekorea/                   # Placeholder / cadangan untuk aplikasi tambahan
│
├── packages/                      # Shared packages / modul yang bisa dipakai ulang antar apps
│   ├── database/                  # Modul Database utama (Prisma)
│   │   ├── prisma/
│   │   │   └── schema.prisma      # Definisi tabel DB (User, Quiz, Question, Transaction, dll)
│   │   ├── src/
│   │   │   └── index.ts           # Export Prisma client ke apps lain
│   │   └── package.json           # Dependensi database (prisma, @prisma/client)
│   │
│   ├── eslint-config/             # Konfigurasi Linter (ESLint) terpusat untuk menjaga standar kode
│   ├── typescript-config/         # Base config `tsconfig.json` untuk seluruh proyek
│   └── ui/                        # Shared UI / Design System components (tombol, form, dll)
│
├── .gitignore                     # File dan folder yang diabaikan oleh Git
├── .npmrc                         # Konfigurasi package manager (npm)
├── package.json                   # Definisi workspace monorepo & script global (turbo run build)
├── turbo.json                     # Konfigurasi Turborepo (caching strategy & pipeline tasks)
└── *.py                           # Kumpulan script Python untuk deployment & DevOps (contoh: deploy.py, check_nginx.py, dll)
```

### Penjelasan Utama dari Struktur:
1. **Pemisahan Logika (Separation of Concerns)**: Kode front-end (`apps/web`) dipisah total dengan back-end (`apps/api`). Keduanya tidak saling bercampur, tetapi diikat melalui workspaces.
2. **Sentralisasi Database (`packages/database`)**: Baik Fastify backend maupun Next.js jika sewaktu-waktu butuh koneksi ke DB, mereka cukup mengimport `@repo/database`. Hal ini memastikan schema dan client database selalu tersinkronisasi.
3. **Ekosistem DevOps yang Kuat**: Tersedianya file `.py` di root folder menandakan proyek ini telah memiliki standard operating procedure (SOP) untuk checking service VPS seperti port analyzer, Nginx reloader, dan SSL fixer otomatis.

---

## 4. Daftar Route dan Navigasi

### Frontend Web Routes (`apps/web/app/`)
Dibangun menggunakan sistem folder Next.js App Router:
- **`/(auth)`**: Halaman terkait login, register, dan autentikasi.
- **`/admin`**: Dashboard khusus pengelola (Admin) untuk mengatur materi, kosakata, dan soal ujian.
- **`/dashboard`**: Halaman utama pengguna setelah berhasil login (menampilkan profil, XP, streak).
- **`/artikel`**: Modul Blog untuk membaca berita/informasi (menarik dari model Blog).
- **`/kosakata`**: Modul pembelajaran dan hafalan kosakata Bahasa Korea.
- **`/materi`**: Modul pembelajaran teks/video interaktif untuk pengguna.
- **`/latihan-soal`**: Modul kuis cepat (mini test) untuk mengasah Reading dan Listening.
- **`/simulasi-ujian` & `/tryout`**: Sistem CBT untuk pengerjaan ujian penuh secara terjadwal atau tryout latihan bebas.

### Backend API Routes (`apps/api/src/routes/`)
Dibangun menggunakan sistem routing Fastify:
- **`/admin`**: Endpoint internal pengelola (Create, Update, Delete untuk model-model di database).
- **`/auth`**: Login (bcrypt comparison) dan penerbitan token akses (JWT).
- **`/payment`**: Webhook dan proses inisiasi pembayaran transaksi (Mendukung Payment Gateway seperti Doku).
- **`/quiz`**: Endpoint validasi jawaban, kalkulasi skor `score`, `total`, dan penyimpanan hasil ke tabel `Result`.
- **`/user`**: Endpoint pengelolaan detail user, profil, peningkatan level, dan XP harian.
