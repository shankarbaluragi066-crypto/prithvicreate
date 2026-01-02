
import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';

interface ServicesProps {
  store: any;
}

const Services: React.FC<ServicesProps> = ({ store }) => {
  const { services } = store;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Link to="/" className="inline-flex items-center text-blue-600 font-bold mb-4 hover:underline">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Our Elite Services</h1>
            <p className="text-slate-500 max-w-2xl">Browse our high-end production and creative solutions designed for modern growth.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.filter((s: Service) => s.status === 'published').map((service: Service) => (
            <div key={service.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Link to={`/service/${service.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-slate-700 shadow-sm">{service.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400 text-xs">★★★★★</div>
                    <span className="text-xs font-semibold text-slate-400">(4.9)</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">{service.title}</h3>
                  <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                    <div className="text-slate-500 text-sm">Starting at</div>
                    <div className="text-2xl font-black text-slate-900">${service.price}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
