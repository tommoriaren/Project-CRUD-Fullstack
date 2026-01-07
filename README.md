# 🎓 Sistem Informasi Data Siswa (CRUD Fullstack)
### Proyek Uji Kompetensi BBPVP Bekasi - Kejuruan Teknologi Informasi

Aplikasi berbasis web untuk manajemen data siswa yang mengimplementasikan operasi CRUD secara lengkap. Proyek ini menggunakan arsitektur **MVC (Model-View-Controller)** untuk memastikan kode terorganisir, mudah dipelihara, dan aman.

---

## 🌟 Fitur Utama
- **Dashboard Statis**: Halaman beranda dengan antarmuka yang bersih.
- **Manajemen Siswa**: Daftar siswa, tambah data, edit data, dan hapus data.
- **Otomatisasi Kode Siswa**: Sistem men-generate kode unik (contoh: S0001) secara otomatis berdasarkan data terakhir di database.
- **Validasi Integritas**: Kolom Kode Siswa bersifat *Read-Only* untuk mencegah duplikasi manual.
- **Responsive Design**: Tampilan yang rapi di berbagai ukuran layar menggunakan CSS modern.

---

## 🛠️ Tech Stack
| Bagian | Teknologi |
| :--- | :--- |
| **Frontend** | React.js (Vite), Axios, React Router Dom |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Environment** | Dotenv (Keamanan Konfigurasi) |

---

## 📂 Struktur Proyek
```text
.
├── backend/
│   ├── config/          # Konfigurasi koneksi MySQL
│   ├── controllers/     # Logika bisnis (Generate kode, Validasi)
│   ├── models/          # Query SQL (SELECT, INSERT, UPDATE, DELETE)
│   ├── routes/          # Definisi Endpoint API
│   ├── .env             # Kredensial DB (Jangan di-push ke GitHub!)
│   ├── index.js         # Entry point server
│   └── schema.sql       # Script untuk membuat database & tabel
└── frontend/
    ├── src/
    │   ├── components/  # Navigasi (Navbar)
    │   ├── pages/       # Halaman (SiswaList, SiswaForm, Home)
    │   └── App.jsx      # Root component & Routing
    ├── .env             # URL API Backend
    └── package.json

📝 Catatan Penting untuk Penguji
Integrasi API: Komunikasi data menggunakan Axios dengan penanganan asinkron (Async/Await).

Validasi Kode: Sistem secara otomatis mengambil kode terakhir dari database dan menambahkannya 1 (Increment) saat form "Tambah Baru" dibuka.

Penanganan Error: Terdapat kode ERR-01 jika frontend gagal terhubung ke backend, sebagai bentuk Error Handling.

👨‍💻 Informasi Pengembang
Nama: Tommy Oktoriyan Ketaren

Asal Lembaga: BBPVP Bekasi

Kejuruan: TIK (Pengembangan Web dengan Nodejs dan React NB5)

Tahun: 2025/2026
