
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteSettings } from '../types';

interface NavbarProps {
  settings: SiteSettings;
  isAuthenticated: boolean;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ settings, isAuthenticated, logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
              <span className="mr-2 px-2.5 py-1.5 bg-blue-600 text-white rounded-xl text-sm leading-none">{settings.logo}</span>
              <span className="hidden sm:inline">{settings.name}</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className={`text-sm font-semibold transition ${location.pathname === link.href ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={logout} 
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-blue-600">
                  Visitor Login
                </Link>
                <Link to="/signup" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-3 text-center text-sm font-bold text-slate-700 bg-slate-100 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Visitor Login</Link>
                <Link to="/signup" className="px-4 py-3 text-center text-sm font-bold text-white bg-blue-600 rounded-xl shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
              </>
            ) : (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="px-4 py-3 text-center text-sm font-bold text-red-600">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
