import { useState, useEffect } from 'react'; // Menghapus import React jika Vite/ESLint protes
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SiswaForm = () => {
    const [kodeSiswa, setKodeSiswa] = useState('');
    const [namaSiswa, setNamaSiswa] = useState('');
    const [alamatSiswa, setAlamatSiswa] = useState('');
    const [tanggalSiswa, setTanggalSiswa] = useState('');
    const [jurusanSiswa, setJurusanSiswa] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSiswaById();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getSiswaById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/siswa/${id}`);
            setKodeSiswa(response.data.kode_siswa);
            setNamaSiswa(response.data.nama_siswa);
            setAlamatSiswa(response.data.alamat_siswa);
            
            // Perbaikan parsing tanggal agar aman dari error undefined
            if (response.data.tanggal_siswa) {
                const formattedDate = response.data.tanggal_siswa.split('T')[0];
                setTanggalSiswa(formattedDate);
            }
            
            setJurusanSiswa(response.data.jurusan_siswa);
        } catch (error) {
            console.error("Gagal mengambil data siswa:", error);
        }
    };

    const saveSiswa = async (e) => {
        e.preventDefault();
        const dataSiswa = {
            kode_siswa: kodeSiswa,
            nama_siswa: namaSiswa,
            alamat_siswa: alamatSiswa,
            tanggal_siswa: tanggalSiswa,
            jurusan_siswa: jurusanSiswa
        };
        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/siswa/${id}`, dataSiswa);
            } else {
                await axios.post('http://localhost:5000/api/siswa', dataSiswa);
            }
            navigate('/siswa');
        } catch (error) {
            // 1. Lihat detail di console (F12 di browser -> tab Console)
            console.log("Full Error Object:", error.response);

            // 2. Tampilkan pesan error spesifik dari backend jika ada
            const msg = error.response?.data?.message || "Terjadi kesalahan pada server";
            alert(msg);
        }
    };

    return (
        <div style={{ padding: "0 20px", fontFamily: "Arial", maxWidth: "600px" }}>
            <h2>{id ? "Edit Data Siswa" : "Tambah Siswa Baru"}</h2>
            <hr />
            <form onSubmit={saveSiswa} style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Kode Siswa</label>
                    <input 
                        type="text" 
                        value={kodeSiswa} 
                        onChange={(e) => setKodeSiswa(e.target.value)} 
                        required
                        readOnly={!!id}
                        style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }} 
                        placeholder="Contoh: S0001"
                    />
                    {id && <small style={{ color: "gray" }}>*Kode siswa tidak dapat diubah.</small>}
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Nama Siswa</label>
                    <input 
                        type="text" 
                        value={namaSiswa} 
                        onChange={(e) => setNamaSiswa(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }} 
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Alamat</label>
                    <textarea 
                        value={alamatSiswa} 
                        onChange={(e) => setAlamatSiswa(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box", height: "80px" }} 
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Tanggal Lahir</label>
                    <input 
                        type="date" 
                        value={tanggalSiswa} 
                        onChange={(e) => setTanggalSiswa(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }} 
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontWeight: "bold" }}>Jurusan</label>
                    <select 
                        value={jurusanSiswa} 
                        onChange={(e) => setJurusanSiswa(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
                    >
                        <option value="">-- Pilih Jurusan --</option>
                        <option value="RPL">Rekayasa Perangkat Lunak</option>
                        <option value="TKJ">Teknik Komputer Jaringan</option>
                        <option value="Multimedia">Multimedia</option>
                    </select>
                </div>
                
                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" style={{ 
                        padding: "10px 20px", 
                        backgroundColor: "#007bff", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer" 
                    }}>
                        {id ? "Update Data" : "Simpan Data"}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/siswa')} 
                        style={{ 
                            padding: "10px 20px", 
                            backgroundColor: "#6c757d", 
                            color: "white", 
                            border: "none", 
                            borderRadius: "4px",
                            cursor: "pointer" 
                        }}
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiswaForm;