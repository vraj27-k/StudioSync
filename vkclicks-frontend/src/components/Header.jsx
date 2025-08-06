import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function StickyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Find Photographers", path: "/discover", icon: "🔍" },
    { name: "Gallery", path: "/gallery", icon: "🖼️" },
    { name: "Services", path: "/services", icon: "💼" },
    { name: "About", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📞" },
  ];

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled 
          ? 'navbar-light bg-white shadow-lg' 
          : 'navbar-light bg-white'
      }`}
    >
      <div className="container">
        {/* Stylish Brand Logo */}
        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to="/"
        >
          <span className="brand-text">
            <span className="brand-primary fw-bold">VK</span>
            <span className="brand-secondary fw-normal">Clicks</span>
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navItems.map(({ name, path, icon }) => (
              <li className="nav-item" key={name}>
                <Link 
                  className={`nav-link px-3 py-2 fw-medium position-relative ${
                    location.pathname === path ? 'active active-black' : 'text-dark'
                  }`}
                  to={path}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="me-2 d-lg-none">{icon}</span>
                  <span>{name}</span>
                  {location.pathname === path && (
                    <span className="active-line"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Buttons - Black Theme */}
          <div className="d-flex gap-2 auth-section">
            <Link 
              to="/login" 
              className="btn btn-outline-dark btn-sm px-3 py-2 rounded-pill"
            >
              <span className="me-1">👤</span>
              Login
            </Link>
            <Link 
              to="/signup" 
              className="btn btn-dark btn-sm px-3 py-2 rounded-pill"
            >
              <span className="me-1">✨</span>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* Import Stylish Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap');

        /* Professional Clean Navbar */
        .navbar {
          transition: all 0.3s ease;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        
        .navbar.shadow-lg {
          box-shadow: 0 2px 20px rgba(0,0,0,0.1) !important;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        /* Stylish Brand Styling */
        .navbar-brand {
          font-size: 1.8rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .navbar-brand:hover {
          transform: scale(1.05);
        }
        
        .brand-text {
          font-family: 'Playfair Display', serif;
          letter-spacing: -1px;
          position: relative;
        }
        
        .brand-primary {
          color: #000000 !important;
          font-weight: 900;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          position: relative;
        }
        
        .brand-primary::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #000000, #333333);
          border-radius: 2px;
        }
        
        .brand-secondary {
          color: #333333 !important;
          font-weight: 400;
          font-style: italic;
          margin-left: 2px;
        }
        
        /* Navigation Links - All Black Theme */
        .nav-link {
          color: #374151 !important;
          font-weight: 500;
          transition: all 0.3s ease;
          border-radius: 6px;
          margin: 0 0.25rem;
          position: relative;
          font-family: 'Inter', sans-serif;
        }
        
        .nav-link:hover {
          color: #000000 !important;
          background-color: rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }
        
        .nav-link.active-black {
          color: #000000 !important;
          font-weight: 600;
        }
        
        .active-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, #000000, #333333);
          border-radius: 1px;
        }
        
        /* Buttons - Black Theme */
        .btn-outline-dark {
          color: #000000 !important;
          border-color: #000000 !important;
          font-weight: 500;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }
        
        .btn-outline-dark:hover {
          background-color: #000000 !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        .btn-dark {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          border: none;
          font-weight: 500;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }
        
        .btn-dark:hover {
          background: linear-gradient(135deg, #333333 0%, #000000 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        
        /* Mobile Toggle */
        .navbar-toggler {
          padding: 0.5rem;
        }
        
        .navbar-toggler:focus {
          box-shadow: none;
        }
        
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
        
        /* Mobile Styles */
        @media (max-width: 991px) {
          .navbar-collapse {
            background: #ffffff;
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 12px;
            margin-top: 1rem;
            padding: 1.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          
          .nav-link {
            padding: 0.75rem 1rem;
            margin: 0.2rem 0;
            border-radius: 8px;
          }
          
          .nav-link:hover {
            background-color: rgba(0, 0, 0, 0.08);
          }
          
          .auth-section {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(0,0,0,0.1);
          }
          
          .auth-section .btn {
            flex: 1;
            text-align: center;
          }
          
          .brand-text {
            font-size: 1.5rem;
          }
        }
        
        /* Professional Typography */
        .navbar {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Container Spacing */
        .container {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        @media (min-width: 1200px) {
          .container {
            max-width: 1140px;
          }
        }
        
        /* Additional Hover Effects */
        .navbar-brand:hover .brand-primary {
          color: #333333 !important;
        }
        
        .navbar-brand:hover .brand-secondary {
          color: #000000 !important;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </nav>
  );
}
