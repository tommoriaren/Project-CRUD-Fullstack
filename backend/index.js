const express = require('express');
const cors = require('cors');
const siswaRoutes = require('./routes/siswaRoutes');

const app = express();

app.use(cors());
app.use(express.json()); // Agar server bisa membaca format JSON dari React

// Menggunakan routes yang sudah dibuat
app.use('/api/siswa', siswaRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});