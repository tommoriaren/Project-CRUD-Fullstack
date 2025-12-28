import { useState, useEffect } from 'react';
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

    // Mengambil URL dasar dari environment variable
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        if (id) {
            getSiswaById();
        } else {
            // Panggil fungsi ini jika sedang mode TAMBAH
            fetchNextKode();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // FUNGSI BARU: Mengambil kode otomatis dari backend
    const fetchNextKode = async () => {
        try {
            const response = await axios.get(`${API_URL}/siswa/next-kode`);
            setKodeSiswa(response.data.nextKode);
        } catch (error) {
            console.error("Gagal mengambil kode otomatis:", error);
            setKodeSiswa("ERR-01"); // Fallback jika backend mati
        }
    };

    const getSiswaById = async () => {
        try {
            const response = await axios.get(`${API_URL}/siswa/${id}`);
            setKodeSiswa(response.data.kode_siswa);
            setNamaSiswa(response.data.nama_siswa);
            setAlamatSiswa(response.data.alamat_siswa);
            
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
            kode_siswa: kodeSiswa, // Mengirim kode yang sudah ter-generate
            nama_siswa: namaSiswa,
            alamat_siswa: alamatSiswa,
            tanggal_siswa: tanggalSiswa,
            jurusan_siswa: jurusanSiswa
        };
        try {
            if (id) {
                await axios.put(`${API_URL}/siswa/${id}`, dataSiswa);
            } else {
                await axios.post(`${API_URL}/siswa`, dataSiswa);
            }
            navigate('/siswa');
        } catch (error) {
            console.log("Full Error Object:", error.response);
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
                    <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Kode Siswa</label>
                    <input 
                        type="text" 
                        // Sekarang value selalu menampilkan kodeSiswa (angka atau S000x)
                        value={kodeSiswa} 
                        readOnly 
                        style={{ 
                            width: "100%", 
                            padding: "8px", 
                            backgroundColor: "#e9ecef", 
                            cursor: "not-allowed",
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                            fontWeight: "bold"
                        }}
                    />
                    <small style={{ color: "gray" }}>
                        {id ? "*Kode siswa tidak dapat diubah." : "*Kode ini dibuat otomatis oleh sistem."}
                    </small>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", fontWeight: "bold" }}>Nama Siswa</label>
                    <input 
                        type="text" 
                        value={namaSiswa} 
                        onChange={(e) => setNamaSiswa(e.target.value)} 
                        placeholder="Masukkan nama lengkap"
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }} 
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", fontWeight: "bold" }}>Alamat</label>
                    <textarea 
                        value={alamatSiswa} 
                        onChange={(e) => setAlamatSiswa(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box", height: "80px" }} 
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", fontWeight: "bold" }}>Tanggal Lahir</label>
                    <input 
                        type="date" 
                        value={tanggalSiswa} 
                        onChange={(e) => setTanggalSiswa(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }} 
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontWeight: "bold" }}>Jurusan</label>
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
                
                <div style={{ display: "flex", gap: "10px", paddingBottom: "50px" }}>
                    <button type="submit" style={{ 
                        padding: "10px 20px", 
                        backgroundColor: "#007bff", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold"
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