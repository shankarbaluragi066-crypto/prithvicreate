
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
          subject: 'New Contact Inquiry - Prithvi Creation',
          ...formData
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 font-bold mb-12 hover:underline">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Home
        </Link>

        {submitted ? (
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-16 text-center border border-slate-100 animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8">✓</div>
            <h1 className="text-4xl font-black text-slate-900 mb-6">Message Received!</h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed">
              Thanks for reaching out, <span className="font-bold text-slate-900">{formData.name}</span>. One of our lead strategists will contact you via <span className="font-bold text-slate-900">{formData.email}</span> within the next 24 hours.
            </p>
            <Link to="/" className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition">
              Return Home
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            <div className="bg-blue-600 p-12 md:w-1/3 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-black mb-6">Contact Us</h2>
                <p className="text-blue-100 mb-12 font-medium">Ready to start your next big project? Send us your details and we'll get back to you shortly.</p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">📧</div>
                    <div>
                      <p className="text-xs font-black uppercase opacity-70">Email</p>
                      <p className="font-bold">hello@prithvi.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">📱</div>
                    <div>
                      <p className="text-xs font-black uppercase opacity-70">WhatsApp</p>
                      <p className="font-bold">+1 234 567 890</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-12 text-xs font-bold text-blue-300 uppercase tracking-widest">
                © 2024 Prithvi Creation
              </div>
            </div>

            <div className="p-12 md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Full Name</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Email Address</label>
                  <input 
                    required
                    type="email"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Order / Project Details</label>
                  <textarea 
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition h-48 resize-none"
                    placeholder="Please describe your requirements or inquiry in detail..."
                    value={formData.details}
                    onChange={e => setFormData({...formData, details: e.target.value})}
                  />
                </div>
                
                {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Sending...
                    </>
                  ) : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
