import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';

const StudentLayout = () => {
  return (
    <div className="min-h-screen flex flex-col p-4 max-w-5xl mx-auto">
      <GlobalHeader portalType="student" />
      <main className="flex-1 mt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
