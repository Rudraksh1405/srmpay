import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-srm-orange text-white hover:bg-orange-600 shadow-md shadow-orange-500/20',
    secondary: 'bg-srm-green text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20',
    admin: 'bg-srm-blue text-white hover:bg-blue-900 shadow-md shadow-blue-900/20',
    outline: 'border-2 border-slate-200 dark:border-slate-700 hover:border-srm-orange hover:text-srm-orange dark:hover:border-srm-orange',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20'
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
