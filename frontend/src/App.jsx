import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiswaList from './pages/SiswaList';
import SiswaForm from './pages/SiswaForm';
import Navbar from './components/Navbar';

// Komponen sederhana untuk Beranda dengan style tambahan
const Home = () => (
  <div style={styles.homeContainer}>
    <h1 style={styles.title}>Selamat Datang di Sistem Informasi Siswa</h1>
    <p style={styles.subtitle}>Gunakan menu di atas untuk mengelola data siswa secara efisien.</p>
    <div style={styles.card}>
      <h3>Statistik Cepat</h3>
      <p>Aplikasi ini terhubung ke database MySQL untuk manajemen data real-time.</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      {/* Wrapper utama untuk memberikan background dan font standar */}
      <div style={styles.appWrapper}>
        <Navbar />
        
        {/* Container untuk konten agar berada di tengah dan rapi */}
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/siswa" element={<SiswaList />} />
            <Route path="/add" element={<SiswaForm />} />
            <Route path="/edit/:id" element={<SiswaForm />} />
          </Routes>
        </main>

        <footer style={styles.footer}>
          &copy; 2025 Sistem Informasi Siswa - Project CRUD Fullstack
        </footer>
      </div>
    </BrowserRouter>
  );
}

// Objek Style untuk menjaga kebersihan kode JSX
const styles = {
  appWrapper: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f4f7f6',
    color: '#333',
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    flex: 1, // Agar footer tetap di bawah
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box'
  },
  homeContainer: {
    textAlign: 'center',
    marginTop: '50px'
  },
  title: {
    color: '#2c3e50',
    fontSize: '2.5rem',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginBottom: '30px'
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    margin: '0 auto'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '0.9rem'
  }
};

export default App;