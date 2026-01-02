
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Service } from '../types';

interface ServiceDetailProps {
  store: any;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ store }) => {
  const { id } = useParams<{ id: string }>();
  const service = store.services.find((s: Service) => s.id === id);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  if (!service) return <div className="py-20 text-center">Service not found</div>;

  // Helper to detect media type
  const isVideo = (url: string) => {
    return url.startsWith('data:video') || 
           url.toLowerCase().endsWith('.mp4') || 
           url.toLowerCase().endsWith('.webm') || 
           url.toLowerCase().endsWith('.mov');
  };

  // Combine images and videos for a unified gallery experience
  const allMedia = [
    ...(service.images || []),
    ...(service.videos || [])
  ];

  const activeMediaUrl = allMedia[activeMediaIndex] || allMedia[0];
  const activeIsVideo = activeMediaUrl ? isVideo(activeMediaUrl) : false;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Content */}
        <div className="flex-grow lg:w-2/3">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-blue-600 transition">{service.category}</Link>
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-8 leading-tight">
            {service.title}
          </h1>

          {/* Professional Gallery Stage */}
          <div className="space-y-4 mb-12">
            <div className="bg-slate-900 rounded-[2.5rem] aspect-video overflow-hidden shadow-2xl relative flex items-center justify-center border border-slate-200 group">
              {activeIsVideo ? (
                <video 
                  src={activeMediaUrl} 
                  controls 
                  autoPlay 
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img 
                  src={activeMediaUrl} 
                  alt="Gallery Main" 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              )}
            </div>

            {/* Thumbnail Strip */}
            {allMedia.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {allMedia.map((url, idx) => {
                  const mediaIsVideo = isVideo(url);
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`relative flex-shrink-0 w-28 aspect-video rounded-2xl overflow-hidden border-2 transition-all ${
                        activeMediaIndex === idx ? 'border-blue-600 scale-105 shadow-xl' : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      {mediaIsVideo ? (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <video src={url} className="w-full h-full object-cover" muted playsInline />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                             <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                               <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                             </div>
                          </div>
                        </div>
                      ) : (
                        <img src={url} className="w-full h-full object-cover" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Gig Overview</h2>
            <div className="text-slate-600 leading-relaxed text-lg space-y-6 whitespace-pre-line">
              {service.description}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl mb-6">Expert Advantage</h3>
              <ul className="space-y-4">
                {['Direct Artist Communication', 'Fast 48h Turnaround', 'Premium Visual Quality', 'Tailored Strategy'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl mb-6">Deliverables</h3>
              <ul className="space-y-4">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Sidebar */}
        <div className="lg:w-1/3">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">Standard Package</span>
                  <span className="text-sm font-bold text-slate-400">Fixed Cost</span>
                </div>
                <span className="text-4xl font-black text-slate-900">${service.price}</span>
              </div>
              <div className="p-10">
                <p className="text-slate-500 font-medium mb-8">
                  Get full access to our professional production suite with {service.revisions === 99 ? 'unlimited' : service.revisions} revisions.
                </p>
                
                <div className="space-y-5 mb-10">
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-slate-600 font-bold text-sm">Delivery Time</span>
                    <span className="text-sm font-black text-slate-900">{service.deliveryDays} Days</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-slate-600 font-bold text-sm">Revisions</span>
                    <span className="text-sm font-black text-slate-900">{service.revisions === 99 ? 'Unlimited' : service.revisions}</span>
                  </div>
                </div>

                <Link 
                  to={`/checkout/${service.id}`}
                  className="block w-full py-5 bg-blue-600 text-white font-black rounded-2xl text-center hover:bg-blue-700 transition shadow-xl shadow-blue-200 text-lg"
                >
                  Continue to Order
                </Link>
                <p className="mt-6 text-center text-[10px] text-slate-400 uppercase font-black tracking-widest">
                  Secure Checkout Guaranteed
                </p>
              </div>
            </div>

            {/* Attachments */}
            {service.pdfs && service.pdfs.length > 0 && (
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Portfolio Docs</h4>
                <div className="space-y-2">
                  {service.pdfs.map((pdf, idx) => (
                    <a 
                      key={idx}
                      href={pdf} 
                      download={`asset_${idx+1}.pdf`}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition border border-slate-100 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-red-500 font-bold text-[10px] bg-red-50 px-2 py-1 rounded">PDF</span>
                        <span className="text-xs font-bold text-slate-700 truncate max-w-[10rem]">Asset_{idx+1}.pdf</span>
                      </div>
                      <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2"/></svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
