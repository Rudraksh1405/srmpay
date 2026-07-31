import React, { useState, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { getVendorOrders, updateOrderStatus } from '../../api';

const VendorOrders = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getVendorOrders(user._id);
      // Filter out 'Served' orders from active dashboard usually, but keep for now
      const activeOrders = data.filter(o => o.status !== 'Served').sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setOrders(activeOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, [user._id]);

  const handleAdvanceStatus = async (order) => {
    const nextStatus = order.status === 'Placed' ? 'Preparing' : order.status === 'Preparing' ? 'Ready' : 'Served';
    try {
      await updateOrderStatus(order._id, nextStatus);
      addToast(`Token ${order.tokenNumber} marked as ${nextStatus}`, 'success');
      fetchOrders();
    } catch (err) {
      addToast('Failed to update status', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">Active Orders</h1>
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Active Orders</h1>
      
      {orders.length === 0 ? (
        <EmptyState message="No active orders at the moment." icon={ClipboardList} />
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <GlassCard key={order._id} className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="bg-srm-green/10 text-srm-green w-16 h-16 rounded-xl flex items-center justify-center font-black text-2xl shadow-sm">
                  {order.tokenNumber}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide
                      ${order.status === 'Placed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 
                        order.status === 'Preparing' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}`}
                    >
                      {order.status}
                    </span>
                    <span className="font-bold text-lg">₹{order.totalAmount}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                  </p>
                </div>
              </div>
              
              <div className="w-full sm:w-auto mt-4 sm:mt-0">
                <Button 
                  variant="secondary" 
                  className="w-full sm:w-auto whitespace-nowrap"
                  onClick={() => handleAdvanceStatus(order)}
                >
                  {order.status === 'Placed' ? 'Start Preparing' : order.status === 'Preparing' ? 'Mark Ready' : 'Mark Served'}
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorOrders;
