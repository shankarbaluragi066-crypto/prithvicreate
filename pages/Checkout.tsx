
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Service, Order } from '../types';

interface CheckoutProps {
  store: any;
}

const Checkout: React.FC<CheckoutProps> = ({ store }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = store.services.find((s: Service) => s.id === id);
  const { currentUser } = store;

  const [formData, setFormData] = useState({ 
    name: currentUser?.name || '', 
    email: currentUser?.email || '', 
    details: '' 
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Critical: Reactive update when currentUser changes or component mounts
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email
      }));
    }
  }, [currentUser]);

  if (!service) return <div className="py-20 text-center">Service not found</div>;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xnjndvwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          subject: `New Order: ${service.title}`,
          serviceTitle: service.title,
          servicePrice: service.price,
          clientName: formData.name,
          clientEmail: formData.email,
          projectDetails: formData.details
        })
      });

      if (response.ok) {
        const newOrder: Order = {
          id: `ORD-${Math.floor(Math.random() * 10000)}`,
          serviceId: service.id,
          clientName: formData.name,
          clientEmail: formData.email,
          status: 'pending',
          totalAmount: service.price,
          createdAt: new Date().toISOString(),
          details: formData.details
        };
        store.setOrders([...store.orders, newOrder]);
        setIsSuccess(true);
      } else {
        setError('Order processing failed. Please check your network.');
      }
    } catch (err) {
      setError('Connection error. Could not reach server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner shadow-green-200">✓</div>
        <h1 className="text-5xl font-black text-slate-900 mb-6">Order Placed!</h1>
        <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto">
          We've sent a detailed receipt to <span className="font-bold text-slate-900 underline">{formData.email}</span>. A project manager will reach out within 2 hours.
        </p>
        <Link to="/" className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-100">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-black text-slate-900 mb-10">Confirm & Secure</h1>
          
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-12 shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">1</span>
              Client Information
            </h2>
            <form onSubmit={handleOrder} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Full Name</label>
                  <input 
                    required
                    className="w-full px-7 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 transition"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Email Address</label>
                  <input 
                    required
                    type="email"
                    className="w-full px-7 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 transition"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">2</span>
                  Project Requirements
                </h2>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Brief & Custom Requests</label>
                <textarea 
                  required
                  className="w-full px-7 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 transition h-48 resize-none"
                  placeholder="Share your goals, preferred style, and any specific assets we should use..."
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-xs font-black rounded-xl border border-red-100 animate-pulse">
                  {error}
                </div>
              )}

              <div className="pt-10 border-t border-slate-100">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-6 bg-blue-600 text-white font-black rounded-[2rem] shadow-2xl shadow-blue-200 hover:bg-blue-700 transition transform active:scale-[0.98] flex items-center justify-center gap-4 text-xl ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Authenticating Payment...
                    </>
                  ) : (
                    <>
                      Pay & Start Project ($${service.price})
                      <span className="bg-white/20 px-3 py-1 rounded-lg text-xs">NO HIDDEN FEES</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-28 space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 text-white">
              <h2 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Order Summary</h2>
              <div className="flex gap-5 mb-10">
                <img src={service.images[0]} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 shadow-lg" />
                <div className="flex flex-col justify-center">
                  <h3 className="font-black text-sm text-white line-clamp-2 leading-tight mb-2">{service.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">{service.category}</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Package Price</span>
                  <span className="text-white">${service.price}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Processing</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-3xl font-black text-white pt-8 border-t border-white/10 mt-4">
                  <span>Total</span>
                  <span className="text-blue-500">${service.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200">
              <p className="text-lg font-black mb-2">Agency Partnership?</p>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed">Booking more than 5 projects per month? Get custom enterprise pricing.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 font-black text-sm bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition">
                Apply for Partnership
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
