
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

interface LoginProps {
  login: (email: string, pass: string) => boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const Login: React.FC<LoginProps> = ({ login, isAuthenticated, isAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/"} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Audit log attempt
      await fetch('https://formspree.io/f/xnjndvwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          subject: 'Login Access Attempt',
          emailAttempted: email,
          timestamp: new Date().toISOString()
        })
      });

      if (!login(email, password)) {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      if (!login(email, password)) {
        setError('Invalid email or password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-12 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white font-black text-xl rounded-2xl mb-6 shadow-lg shadow-blue-200">
            PC
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-400 font-medium">Please sign in to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center border border-red-100">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
           <p className="text-sm text-slate-400">
             New here? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create an Account</Link>
           </p>
           <p className="text-xs text-slate-400">
             Trouble logging in? <Link to="/contact" className="text-slate-600 font-bold hover:underline">Contact Support</Link>
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
