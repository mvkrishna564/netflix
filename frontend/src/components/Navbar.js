import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">NETFLIX</Link>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search?type=series">TV Shows</Link></li>
          <li><Link to="/search?type=movie">Movies</Link></li>
          <li><Link to="/search">New & Popular</Link></li>
          <li><Link to="/search">My List</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="navbar-search" onClick={() => navigate('/search')}>
          <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <span className="navbar-username">{user?.username}</span>
        <div className="navbar-profile" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={user?.profilePic || 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'} alt="profile" />
          <span className="navbar-caret">{menuOpen ? '▲' : '▼'}</span>
        </div>
        {menuOpen && (
          <div className="navbar-dropdown">
            <Link to="/profile">Profile</Link>
            {user?.isAdmin && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
