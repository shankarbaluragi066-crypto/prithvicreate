
import React from 'react';
import { Link } from 'react-router-dom';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{settings.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering creators and brand owners with high-end creative services. From YouTube editing to full brand identity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/services" className="hover:text-blue-600">Video Editing</Link></li>
              <li><Link to="/services" className="hover:text-blue-600">Graphic Design</Link></li>
              <li><Link to="/services" className="hover:text-blue-600">SEO Writing</Link></li>
              <li><Link to="/services" className="hover:text-blue-600">Brand Consulting</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-600">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Social</h4>
            <div className="flex gap-4">
              {settings.socialLinks.youtube && (
                <a href={settings.socialLinks.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                  YT
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                  IG
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2024 {settings.name}. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-400 items-center">
            <Link to="/login" className="text-xs font-bold text-slate-300 hover:text-blue-600 uppercase tracking-widest transition">
              Admin Login
            </Link>
            <span>Built for Creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
