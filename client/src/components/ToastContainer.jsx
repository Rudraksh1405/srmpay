import React from 'react';
import { useToast } from '../contexts/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="text-green-500" size={24} />,
          error: <AlertCircle className="text-red-500" size={24} />,
          info: <Info className="text-blue-500" size={24} />
        };

        return (
          <div 
            key={toast.id} 
            className="animate-toast-in glass flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-l-4 border-l-slate-400 max-w-sm w-full"
            style={{ 
              borderLeftColor: toast.type === 'success' ? '#10B981' : toast.type === 'error' ? '#EF4444' : '#3B82F6' 
            }}
          >
            {icons[toast.type] || icons.info}
            <p className="flex-1 font-medium text-sm">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="p-1 opacity-50 hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
