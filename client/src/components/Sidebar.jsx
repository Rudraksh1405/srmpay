import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links, portalType }) => {
  const activeColor = portalType === 'vendor' ? 'bg-srm-green/10 text-srm-green border-r-4 border-srm-green' : 'bg-srm-blue/10 text-srm-blue border-r-4 border-srm-blue';
  
  return (
    <aside className="w-64 glass-panel h-[calc(100vh-120px)] sticky top-24 hidden md:flex flex-col gap-2">
      <div className="font-bold text-xl mb-6 px-4">Dashboard</div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? activeColor : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`
            }
          >
            <link.icon size={20} />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
