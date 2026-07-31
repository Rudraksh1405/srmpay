import React from 'react';

const Skeleton = ({ className = '', type = 'rect' }) => {
  const baseClass = 'animate-pulse bg-slate-200 dark:bg-slate-700';
  const typeClass = type === 'circle' ? 'rounded-full' : 'rounded-xl';
  return <div className={`${baseClass} ${typeClass} ${className}`}></div>;
};

export default Skeleton;
