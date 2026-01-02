
import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';

interface HomeProps { store: any; }

const Home: React.FC<HomeProps> = ({ store }) => {
  const { services } = store;

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-blue-500/30 backdrop-blur-md rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 border border-white/20">Elite Production House</span>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
              Crafting Digital <br/><span className="text-blue-200 underline decoration-blue-400/50">Masterpieces.</span>
            </h1>
            <p className="text-2xl text-blue-50/90 mb-12 leading-relaxed max-w-2xl mx-auto">
              We provide professional-grade video production and branding services for creators who demand the best.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/services" className="px-12 py-5 bg-white text-blue-700 font-black rounded-2xl shadow-2xl hover:bg-blue-50 transition transform hover:-translate-y-1">
                View All Services
              </Link>
              <Link to="/contact" className="px-12 py-5 bg-blue-500/30 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl hover:bg-blue-500/40 transition">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-slate-900 mb-6 underline decoration-blue-600/30">Featured Services</h2>
              <p className="text-slate-500 text-lg">Elite creative solutions designed to drive engagement, sales, and brand authority.</p>
            </div>
            <Link to="/services" className="px-8 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              See All Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service: Service) => (
              <div key={service.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                <Link to={`/service/${service.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-1">{service.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{service.category}</span>
                      <span className="text-2xl font-black text-blue-600">${service.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative z-10">
              <h2 className="text-5xl font-black mb-8 leading-tight">Built by creators,<br/><span className="text-blue-500">for the bold.</span></h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">We don't just edit. We architect digital experiences that resonate with millions.</p>
              <Link to="/about" className="inline-flex items-center text-blue-500 font-black text-xl hover:translate-x-2 transition-transform">
                Read our story <span className="ml-3">→</span>
              </Link>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6 relative z-10">
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem]">
                <p className="text-4xl font-black text-blue-500 mb-2">98%</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Satisfaction</p>
              </div>
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem]">
                <p className="text-4xl font-black text-blue-500 mb-2">1.2K</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Projects</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Contact Teaser */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-black text-slate-900 mb-6">Let's build your legacy.</h2>
          <p className="text-xl text-slate-500 mb-12">Stop settling for mediocre production. Join the elite 1% of creators today.</p>
          <Link to="/contact" className="px-16 py-6 bg-blue-600 text-white font-black text-xl rounded-2xl shadow-2xl hover:bg-blue-700 transition transform hover:scale-105 inline-block">
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
