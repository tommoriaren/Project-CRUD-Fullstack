const siswaModel = require('../models/siswaModel');
const db = require('../config/database'); 

// Handler untuk mengambil semua siswa
exports.getAllSiswa = (_, res) => {
    siswaModel.getAll((err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

// Handler untuk mengambil SATU siswa berdasarkan ID
exports.getSiswaById = (req, res) => {
    const id = req.params.id;
    siswaModel.getById(id, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!result) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
        res.json(result); 
    });
};

// 1. Fungsi untuk generate kode otomatis (Tampilan di Form Tambah)
exports.getNextKode = (_, res) => {
    // Mencari kode_siswa dengan angka tertinggi
    db.query('SELECT kode_siswa FROM siswa ORDER BY kode_siswa DESC LIMIT 1', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        let nextNumber = 1;
        if (results.length > 0) {
            // Mengambil angka dari "S0009" -> 9, lalu ditambah 1
            const lastKode = results[0].kode_siswa; 
            const lastNumber = parseInt(lastKode.substring(1)); 
            nextNumber = lastNumber + 1;
        }

        const nextKode = "S" + nextNumber.toString().padStart(4, '0');
        res.json({ nextKode });
    });
};

// 2. Fungsi Simpan Data (Create)
exports.createSiswa = (req, res) => {
    // Kita jalankan ulang logika cari kode terbesar agar data benar-benar presisi saat disimpan
    db.query('SELECT kode_siswa FROM siswa ORDER BY kode_siswa DESC LIMIT 1', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        let nextNumber = 1;
        if (results.length > 0) {
            const lastKode = results[0].kode_siswa;
            const lastNumber = parseInt(lastKode.substring(1));
            nextNumber = lastNumber + 1;
        }

        const generatedKode = "S" + nextNumber.toString().padStart(4, '0');

        // Masukkan kode yang baru digenerate ke dalam objek data
        const dataBaru = {
            ...req.body,
            kode_siswa: generatedKode
        };

        // Simpan ke database melalui Model
        siswaModel.create(dataBaru, (err, results) => {
            if (err) {
                // Jika masih error (misal karena user lain input di saat bersamaan)
                return res.status(500).json({ message: "Gagal simpan: " + err.message });
            }
            res.status(201).json({ 
                message: `Siswa berhasil ditambahkan dengan kode ${generatedKode}` 
            });
        });
    });
};

// Handler untuk update siswa
exports.updateSiswa = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    siswaModel.update(id, data, (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Data siswa berhasil diperbarui' });
    });
};

// Handler untuk hapus siswa
exports.deleteSiswa = (req, res) => {
    const id = req.params.id;
    siswaModel.delete(id, (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Siswa berhasil dihapus' });
    });
};