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

// Handler untuk menambah siswa
exports.createSiswa = (req, res) => {
    // 1. Ambil urutan terakhir untuk membuat kode otomatis
    db.query('SELECT COUNT(*) AS total FROM siswa', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        const nextNumber = results[0].total + 1;
        // Format: S + angka yang dipad dengan 0 sampai 4 digit (S0001, S0002, dst)
        const generatedKode = "S" + nextNumber.toString().padStart(4, '0');

        // 2. Masukkan ke req.body agar model bisa menyimpannya
        const dataBaru = {
            ...req.body,
            kode_siswa: generatedKode
        };

        // 3. Jalankan model create
        siswaModel.create(dataBaru, (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ message: `Siswa berhasil ditambahkan dengan kode ${generatedKode}` });
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