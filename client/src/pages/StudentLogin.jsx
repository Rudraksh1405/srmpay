import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { loginStudent, registerStudent } from '../api';
import ThemeToggle from '../components/ThemeToggle';

const StudentLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!email.endsWith('@srmist.edu.in')) {
      setError('Please use your valid @srmist.edu.in email address.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const response = isRegister 
        ? await registerStudent({ name, email, password })
        : await loginStudent({ email, password });
      
      login(response.user, response.token);
      addToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
      navigate('/student');
    } catch (err) {
      setError('Authentication failed. Please try again.');
      addToast('Authentication failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: 'url("/images/campus/campus.jpg"), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"></div>
      
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Student <span className="text-srm-orange">Portal</span>
          </h1>
        </div>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-srm-orange backdrop-blur-sm"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">SRM Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@srmist.edu.in"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-srm-orange backdrop-blur-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-srm-orange backdrop-blur-sm"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <Button type="submit" variant="primary" className="mt-4" disabled={isLoading}>
              {isLoading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
            </Button>
          </form>

          <p className="text-center text-sm mt-6 text-slate-600 dark:text-slate-300">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-srm-orange font-bold hover:underline">
              {isRegister ? 'Login here' : 'Register here'}
            </button>
          </p>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-center text-slate-500">
              <strong>Demo Account:</strong> demo@srmist.edu.in / demo1234
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default StudentLogin;
