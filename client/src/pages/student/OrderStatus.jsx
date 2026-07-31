import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, ChefHat, PackageCheck, ShoppingBag } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Skeleton from '../../components/Skeleton';
import { useAuth } from '../../contexts/AuthContext';
import { getStudentOrders } from '../../api';

const OrderStatus = () => {
  const { tokenNumber } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Poll for order status
  useEffect(() => {
    let interval;
    const fetchOrder = async () => {
      try {
        const orders = await getStudentOrders(user.email);
        const currentOrder = orders.find(o => o.tokenNumber === tokenNumber);
        setOrder(currentOrder);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchOrder();
    interval = setInterval(fetchOrder, 4000);
    
    return () => clearInterval(interval);
  }, [tokenNumber, user.email]);

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto space-y-6 text-center pt-10">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center pt-20">
        <h2 className="text-2xl font-bold">Order not found</h2>
      </div>
    );
  }

  const steps = [
    { id: 'Placed', label: 'Order Placed', icon: ShoppingBag },
    { id: 'Preparing', label: 'Preparing', icon: ChefHat },
    { id: 'Ready', label: 'Ready for Pickup', icon: PackageCheck },
    { id: 'Served', label: 'Collected', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="max-w-md mx-auto space-y-8 pt-4">
      <div className="text-center space-y-2">
        <p className="text-slate-500 uppercase tracking-widest font-bold text-sm">Token Number</p>
        <div className="text-6xl font-black text-srm-orange drop-shadow-md">{order.tokenNumber}</div>
        <p className="font-medium text-lg text-slate-700 dark:text-slate-200 mt-2">
          {order.status === 'Ready' ? 'Your food is ready!' : order.status === 'Served' ? 'Enjoy your meal!' : 'Preparing your meal...'}
        </p>
      </div>

      <GlassCard className="p-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-700 rounded-full z-0"></div>
          
          <div className="space-y-8 relative z-10">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.id} className={`flex items-center gap-6 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-500 ${isCurrent ? 'bg-srm-orange animate-pulse' : isCompleted ? 'bg-srm-green' : 'bg-slate-300 dark:bg-slate-600'}`}>
                    <step.icon size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isCurrent ? 'text-srm-orange' : ''}`}>{step.label}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      <GlassCard className="bg-slate-50 dark:bg-slate-800/50">
        <h3 className="font-bold mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">Order Summary</h3>
        <ul className="space-y-2">
          {order.items.map((item, idx) => (
            <li key={idx} className="flex justify-between text-sm">
              <span>{item.qty}x {item.name}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
};

export default OrderStatus;
