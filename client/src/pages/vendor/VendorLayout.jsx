import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClipboardList, UtensilsCrossed, TrendingUp } from 'lucide-react';
import GlobalHeader from '../../components/GlobalHeader';
import Sidebar from '../../components/Sidebar';

const VendorLayout = () => {
  const links = [
    { to: '/vendor', label: 'Orders', icon: ClipboardList, end: true },
    { to: '/vendor/menu', label: 'Menu Management', icon: UtensilsCrossed },
    { to: '/vendor/sales', label: 'Sales & Analytics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-7xl mx-auto">
      <GlobalHeader portalType="vendor" />
      <div className="flex flex-1 gap-6">
        <Sidebar links={links} portalType="vendor" />
        <main className="flex-1 w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
