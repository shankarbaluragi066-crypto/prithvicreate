
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 font-bold mb-12 hover:underline">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-sm mb-4 block">Our Origin Story</span>
            <h1 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Empowering the <br/><span className="text-blue-600">Next Generation</span> of Creators.</h1>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Prithvi Creation was founded on a simple principle: high-end creative production shouldn't be reserved only for big-budget agencies. We believe that every creator, regardless of their subscriber count, deserves to have their vision executed with professional precision.
              </p>
              <p>
                We bridge the gap by offering premium editing, strategy, and design services that empower individual YouTubers and emerging brand owners to compete on a global scale.
              </p>
              <p>
                Our team is comprised of industry veterans who have worked with some of the biggest names in digital entertainment. We don't just "edit videos"—we build brands, craft stories, and drive measurable engagement.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-black text-slate-900 mb-1">10+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Years Active</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 mb-1">1.2K</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clients</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 mb-1">50M+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Views Driven</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Team collaborating" />
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
