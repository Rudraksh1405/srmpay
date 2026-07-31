import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

const GlobalHeader = ({ portalType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleHome = () => {
    if (portalType === 'student') navigate('/student');
    else if (portalType === 'vendor') navigate('/vendor');
    else if (portalType === 'admin') navigate('/admin');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === `/${portalType}`;

  return (
    <header className="sticky top-0 z-40 w-full glass rounded-b-3xl border-t-0 px-4 py-3 flex items-center justify-between mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        {!isHome && (
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} />
          </button>
        )}
        <button onClick={handleHome} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
          <Home size={20} className={portalType === 'student' ? 'text-srm-orange' : portalType === 'vendor' ? 'text-srm-green' : 'text-srm-blue'} />
          <span className="font-bold text-lg hidden sm:block">SRMPAY {portalType && `· ${portalType.charAt(0).toUpperCase() + portalType.slice(1)}`}</span>
        </button>
      </div>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm font-medium opacity-70 hidden md:block">{user.email || user.username || user.name || 'User'}</span>}
        <ThemeToggle />
        <button onClick={handleLogout} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default GlobalHeader;
