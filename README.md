# Peminjaman Online Web

Projek website full stack tentang Peminjaman online, projek ini dibuat untuk memenuhi tugas akhir dari kelas pemrograman Web.

Website ini dikontainer menggunakan **Docker**, agar dapat dengan mudah di install dan dijalankan tanpa harus mendownload PHP, Node.js, atau software lainnya secara manual.

## Teknologi yang diggunakan

- **Frontend :** React.js + Vite (Port `5173`)
- **Backend :** Laravel 11 + PHP 8.2 (Port `8000`)
- **Database :** PostgreSQL 17 (Port `5432`)
- **Infrastructure :** Docker

## Menjalankan Web

Ikuti langkah-langkah berikut ini untuk menjalankan website secara lokal

### Software yang diperlukan

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) harus di install dan dijalankan
- [Git](https://git-scm.com/install/) harus di install

### 1. Clone Repository

```bash
git clone [https://github.com/diki6000/peminjaman-online-app.git](https://github.com/diki6000/peminjaman-online-app.git)
cd peminjaman-online-app
```

### 2. Setup Environment Variables

Pastikan BackEnd folder memiliki environment file

### 3. Run with Docker

buka terminal di dalam projek folder lalu jalankan perintah ini

```bash
docker-compose up --build
```

perintah tersebut agar docker membuat container, set up database, and memulai aplikasi.

Note : Akan dibutuhkan beberapa menit setelah pertama kali menjalankan karena docker harus mendownload image and menginstall dependensi.

Jika terdapat error jalankan

```bash
docker-compose down --volumes
```

dan coba lagi, command tersebut akan menghapus database yang telah dibuat sebelummnya

## Cara Penggunaan

Setelah di terminal menunjukan "Server Running" website dapat diakses dengan cara berikut ini"

Frontend (User Interface) - URL: https://localhost:5173

Backend (API & Admin) - API URL: https://localhost:8000

Akses Halaman Admin - Email: admin@example.com - Password: password

## Project Structure

```bash
├── BackEnd/        # Laravel Application (API & Logic)
├── FrontEnd/       # React Application (UI)
├── Docker/         # Database Initialization scripts (init.sql)
└── docker-compose.yml  # Container Orchestration
```

## Credit

Dibuat oleh

- Aditya Dicky Darmawan [GitHub](https://github.com/diki6000)
- Tatas Buana [GitHub]
- Alrafi Syammanjaya [GitHub]
