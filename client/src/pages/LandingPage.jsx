import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { GraduationCap, Store, ShieldCheck } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/campus/campus.jpg"), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="z-10 w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
            SRM<span className="text-srm-orange">PAY</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-md">
            The smart, seamless food ordering platform for SRM KTR campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/student/login">
            <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 hover:-translate-y-2 transition-transform cursor-pointer group">
              <div className="bg-srm-orange/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={48} className="text-srm-orange" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Student</h2>
              <p className="text-slate-300">Order from your favorite campus vendors without waiting in lines.</p>
            </GlassCard>
          </Link>

          <Link to="/vendor/login">
            <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 hover:-translate-y-2 transition-transform cursor-pointer group">
              <div className="bg-srm-green/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Store size={48} className="text-srm-green" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Vendor</h2>
              <p className="text-slate-300">Manage orders, update your menu, and track your daily sales easily.</p>
            </GlassCard>
          </Link>

          <Link to="/admin/login">
            <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 hover:-translate-y-2 transition-transform cursor-pointer group">
              <div className="bg-srm-blue/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={48} className="text-srm-blue" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Admin</h2>
              <p className="text-slate-300">Oversee platform operations, approve vendors, and view analytics.</p>
            </GlassCard>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
