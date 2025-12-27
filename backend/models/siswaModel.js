const db = require('../config/database'); // Sesuaikan path ke koneksi database Anda

const SiswaModel = {
    // 1. Mengambil semua data siswa
    getAll: (callback) => {
        const query = "SELECT * FROM siswa ORDER BY id ASC";
        db.query(query, callback);
    },

    // 2. Mengambil data siswa berdasarkan ID
    getById: (id, callback) => {
        const query = "SELECT * FROM siswa WHERE id = ?";
        db.query(query, [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]); // Mengambil satu data saja
        });
    },

    // 3. Menambahkan siswa baru (Create)
    create: (data, callback) => {
        const query = `
            INSERT INTO siswa 
            (kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            data.kode_siswa, 
            data.nama_siswa, 
            data.alamat_siswa, 
            data.tanggal_siswa, 
            data.jurusan_siswa
        ];
        db.query(query, values, callback);
    },

    // 4. Memperbarui data siswa (Update)
    update: (id, data, callback) => {
        const query = `
            UPDATE siswa SET 
            nama_siswa = ?, 
            alamat_siswa = ?, 
            tanggal_siswa = ?, 
            jurusan_siswa = ? 
            WHERE id = ?
        `;
        const values = [
            data.nama_siswa, 
            data.alamat_siswa, 
            data.tanggal_siswa, 
            data.jurusan_siswa, 
            id
        ];
        db.query(query, values, callback);
    },

    // 5. Menghapus data siswa (Delete)
    delete: (id, callback) => {
        const query = "DELETE FROM siswa WHERE id = ?";
        db.query(query, [id], callback);
    }
};

module.exports = SiswaModel;