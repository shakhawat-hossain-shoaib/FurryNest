import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onJoinUsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';

  const signOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>FurryNest</h1>
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                           <ul className="nav-list">
                   <li><Link to="/adopt-dog" className="nav-link">Adopt a Dog</Link></li>
                   <li><Link to="/adopt-cat" className="nav-link">Adopt a Cat</Link></li>
                   <li><Link to="/ways-to-help" className="nav-link">Ways to Help</Link></li>
                   <li><Link to="/blog" className="nav-link">Blog</Link></li>
                   <li><Link to="/add" className="nav-link">Add Pets</Link></li>
                   <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
                </ul>
                {isLoggedIn ? (
                  <div className="header-actions">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <button className="header-join-btn" onClick={signOut}>Sign Out</button>
                  </div>
                ) : (
                  <Link to="/signin" className="header-join-btn">Join Us</Link>
                )}
        </nav>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
