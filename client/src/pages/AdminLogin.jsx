import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { loginAdmin } from '../api';
import ThemeToggle from '../components/ThemeToggle';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginAdmin({ username, password });
      login(response.user, response.token);
      addToast('Admin authentication successful', 'success');
      navigate('/admin');
    } catch (err) {
      addToast('Invalid admin credentials', 'error');
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
            Admin <span className="text-srm-blue">Portal</span>
          </h1>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Admin ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-srm-blue backdrop-blur-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Security Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-srm-blue backdrop-blur-sm"
                required
              />
            </div>

            <Button type="submit" variant="admin" className="mt-4" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Secure Login'}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-center text-slate-500">
              <strong>Demo Admin:</strong> admin / admin123
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminLogin;
