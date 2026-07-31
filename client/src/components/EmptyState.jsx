import React from 'react';
import { PackageOpen } from 'lucide-react';

const EmptyState = ({ message = 'No data found', icon: Icon = PackageOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500 dark:text-slate-400 glass rounded-2xl">
      <Icon size={48} className="mb-4 opacity-50" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
