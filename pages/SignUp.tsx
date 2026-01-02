
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

interface SignUpProps {
  signup: (name: string, email: string, pass: string) => boolean;
  isAuthenticated: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ signup, isAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/" />;

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
          subject: 'New User Registration Attempt',
          userName: name,
          userEmail: email,
          timestamp: new Date().toISOString()
        })
      });

      if (!signup(name, email, password)) {
        setError('Email already exists. Try logging in.');
      }
    } catch (err) {
      if (!signup(name, email, password)) {
        setError('Registration failed. Please try again.');
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
          <h1 className="text-3xl font-black text-slate-900 mb-2">Join Prithvi</h1>
          <p className="text-slate-400 font-medium">Start your creative journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
              placeholder="Minimum 6 characters"
              minLength={6}
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
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-sm text-slate-400">
             Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
           </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
