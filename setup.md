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

## 3. Struktur Folder Monorepo

Projek ini disusun menggunakan pendekatan workspaces:

### Folder `apps/`
Berisi aplikasi utama yang akan dijalankan/dideploy.
- **`apps/api/`**: Backend service menggunakan **Fastify**. Bertugas menangani logika API murni, autentikasi (JWT), dan pemrosesan data.
- **`apps/web/`**: Frontend utama menggunakan **Next.js (App Router)**. UI yang digunakan oleh user maupun admin (Dashboard, Pengerjaan Soal, dll).
- **`apps/kekorea/`**: Placeholder/cadangan untuk apps tambahan (kosong/hanya framework boilerplate sementara).

### Folder `packages/`
Berisi kode/komponen yang dapat digunakan ulang (shared) ke dalam folder `apps/`.
- **`packages/database/`**: Konfigurasi Prisma, schema, file migrasi, dan script generate db client. `apps/api` dan `apps/web` dapat mengimport modul database ini.
- **`packages/ui/`**: Tempat menaruh UI components (Design System) yang dipakai bersama.
- **`packages/eslint-config/`**: Konfigurasi ESLint global monorepo.
- **`packages/typescript-config/`**: Konfigurasi dasar `tsconfig.json`.

### Script Deployment (Root):
Terdapat banyak file Python (`.py`) seperti `deploy.py`, `check_nginx.py`, `fix_ssl.py`, `check_pm2.py` yang ditujukan untuk deployment dan pengecekan kesehatan server VPS di level production.

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
