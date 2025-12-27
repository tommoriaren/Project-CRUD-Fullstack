CREATE DATABASE sekolah_db;

USE sekolah_db;

CREATE TABLE siswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kode_siswa VARCHAR(10) UNIQUE,
    nama_siswa VARCHAR(100),
    alamat_siswa TEXT,
    tanggal_siswa DATE,
    jurusan_siswa VARCHAR(50)
);
