import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/useAuth';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const signOut = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY);
    
    if (scrollDelta > 10) {
      setIsHeaderVisible(!scrollingDown || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const adminNavItems = [
    { to: "/add", label: "Add Pet" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/blog", label: "Blog" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className={`header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" aria-label="FurryNest Home">
          <h1>FurryNest</h1>
        </Link>

        <nav className="nav-desktop" role="navigation" aria-label="Primary navigation">
          <ul className="nav-list">
            {isAdmin ? (
              adminNavItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={`nav-link ${isActive(item.to) ? 'active' : ''}`}>
                    {item.label}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link 
                    to="/adopt-dog" 
                    className={`nav-link ${isActive('/adopt-dog') ? 'active' : ''}`}
                  >
                    Adopt a Dog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/adopt-cat" 
                    className={`nav-link ${isActive('/adopt-cat') ? 'active' : ''}`}
                  >
                    Adopt a Cat
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/ways-to-help" 
                    className={`nav-link ${isActive('/ways-to-help') ? 'active' : ''}`}
                  >
                    Ways to Help
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/shop" 
                    className={`nav-link ${isActive('/shop') ? 'active' : ''}`}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/request-pet" 
                    className={`nav-link ${isActive('/request-pet') ? 'active' : ''}`}
                  >
                    Request Add Pet
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && !isAdmin && (
              <li>
                <Link 
                  to="/add" 
                  className={`nav-link ${isActive('/add') ? 'active' : ''}`}
                >
                  Add Pets
                </Link>
              </li>
            )}
            {!isAdmin && <li>
              <Link 
                to="/contact" 
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact Us
              </Link>
            </li>}
          </ul>
        </nav>

        <div className="header-actions desktop-only">
          {isAuthenticated ? (
            <>
              {!isAdmin && <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>}
              <button
                className="header-join-btn"
                onClick={signOut}
                aria-label="Sign out"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="header-join-btn"
              aria-label="Sign in or join us"
            >
              Join Us
            </Link>
          )}
        </div>

        <nav
          id="navigation-menu"
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="nav-list-mobile">
            {isAdmin ? (
              adminNavItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link
                    to="/adopt-dog"
                    className={`nav-link ${isActive('/adopt-dog') ? 'active' : ''}`}
                  >
                    Adopt a Dog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adopt-cat"
                    className={`nav-link ${isActive('/adopt-cat') ? 'active' : ''}`}
                  >
                    Adopt a Cat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ways-to-help"
                    className={`nav-link ${isActive('/ways-to-help') ? 'active' : ''}`}
                  >
                    Ways to Help
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className={`nav-link ${isActive('/shop') ? 'active' : ''}`}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/request-pet"
                    className={`nav-link ${isActive('/request-pet') ? 'active' : ''}`}
                  >
                    Request Add Pet
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && !isAdmin && (
              <li>
                <Link
                  to="/add"
                  className={`nav-link ${isActive('/add') ? 'active' : ''}`}
                >
                  Add Pets
                </Link>
              </li>
            )}
            {!isAdmin && <li>
              <Link
                to="/contact"
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact Us
              </Link>
            </li>}
            {isAuthenticated && !isAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="header-actions mobile-only">
            {isAuthenticated ? (
              <button className="header-join-btn" onClick={signOut} aria-label="Sign out">
                Sign Out
              </button>
            ) : (
              <Link to="/signin" className="header-join-btn" aria-label="Sign in or join us">
                Join Us
              </Link>
            )}
          </div>
        </nav>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="navigation-menu"
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
