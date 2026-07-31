import React from 'react';

const GlassCard = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`glass rounded-2xl transition-all duration-300 ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
