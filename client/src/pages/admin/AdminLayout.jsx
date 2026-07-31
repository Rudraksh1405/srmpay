import React from 'react';
import { Outlet } from 'react-router-dom';
import { Users, FileQuestion, PieChart } from 'lucide-react';
import GlobalHeader from '../../components/GlobalHeader';
import Sidebar from '../../components/Sidebar';

const AdminLayout = () => {
  const links = [
    { to: '/admin', label: 'Vendors', icon: Users, end: true },
    { to: '/admin/requests', label: 'Vendor Requests', icon: FileQuestion },
    { to: '/admin/analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-7xl mx-auto">
      <GlobalHeader portalType="admin" />
      <div className="flex flex-1 gap-6">
        <Sidebar links={links} portalType="admin" />
        <main className="flex-1 w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
