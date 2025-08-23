import React, { useState } from "react";

const Header = ({ onJoinUsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <li><a href="#adopt-dog" className="nav-link">Adopt a Dog</a></li>
            <li><a href="#adopt-cat" className="nav-link">Adopt a Cat</a></li>
            <li><a href="#ways-to-help" className="nav-link">Ways to Help</a></li>
            <li><a href="#blog" className="nav-link">Blog</a></li>
            <li><a href="#contact" className="nav-link">Contact Us</a></li>
          </ul>
          <button className="header-join-btn" onClick={onJoinUsClick}>
            Join Us
          </button>
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
