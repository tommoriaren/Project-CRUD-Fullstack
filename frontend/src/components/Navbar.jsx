import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navStyle = {
        backgroundColor: '#333',
        padding: '1rem',
        display: 'flex',
        gap: '20px'
    };

    const linkStyle = ({ isActive }) => ({
        color: 'white',
        textDecoration: isActive ? 'underline' : 'none',
        fontWeight: isActive ? 'bold' : 'normal',
    });

    return (
        <nav style={navStyle}>
            <NavLink to="/" style={linkStyle}>Beranda</NavLink>
            <NavLink to="/siswa" style={linkStyle}>Daftar Siswa</NavLink>
        </nav>
    );
};

export default Navbar;