import { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

const SiswaList = () => {
    const [siswa, setSiswa] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // State untuk loading

    const getSiswa = async () => {
        setIsLoading(true); // Mulai loading
        try {
            const response = await axios.get('http://localhost:5000/api/siswa');
            setSiswa(response.data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            setIsLoading(false); // Selesai loading
        }
    };

    useEffect(() => {
        getSiswa();
    }, []);

    const deleteSiswa = async (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`http://localhost:5000/api/siswa/${id}`);
                getSiswa(); // Refresh data setelah hapus
            } catch (error) {
                console.error(error);
                alert("Gagal menghapus data");
            }
        }
    };

    return (
        <div style={{ padding: "0 20px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Daftar Siswa</h2>
                <Link to="/add">
                    <button style={{ padding: "8px 15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        + Tambah Baru
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Tanggal</th>
                        <th>Jurusan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Memuat data...</td>
                        </tr>
                    ) : (
                        siswa && siswa.length > 0 ? (
                            siswa.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.kode_siswa}</td>
                                    <td>{item.nama_siswa}</td>
                                    <td>{item.alamat_siswa}</td>
                                    <td>{new Date(item.tanggal_siswa).toLocaleDateString('id-ID')}</td>
                                    <td>{item.jurusan_siswa}</td>
                                    <td>
                                        <Link to={`/edit/${item.id}`}>
                                            <button style={{ marginRight: "5px", backgroundColor: "#ffc107", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}>
                                                Edit
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => deleteSiswa(item.id)}
                                            style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Belum ada data.</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SiswaList;