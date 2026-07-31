import React, { useState, useEffect } from 'react';
import { IndianRupee, ShoppingBag } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Skeleton from '../../components/Skeleton';
import { useAuth } from '../../contexts/AuthContext';
import { getVendorOrders } from '../../api';

const VendorSales = () => {
  const { user } = useAuth();
  const [salesData, setSalesData] = useState({ revenue: 0, count: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const orders = await getVendorOrders(user._id);
        // Calculate today's sales from mock orders
        const total = orders.reduce((acc, o) => acc + o.totalAmount, 0);
        setSalesData({ revenue: total, count: orders.length });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSales();
  }, [user._id]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Sales & Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Sales & Analytics</h1>
      <p className="text-slate-500 mb-6">Today's Performance</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="flex items-center gap-6 p-8 border-l-4 border-l-srm-green">
          <div className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 p-4 rounded-2xl">
            <IndianRupee size={32} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Total Revenue</p>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white">₹{salesData.revenue.toLocaleString()}</h2>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-6 p-8 border-l-4 border-l-srm-orange">
          <div className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 p-4 rounded-2xl">
            <ShoppingBag size={32} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Orders Completed</p>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white">{salesData.count}</h2>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default VendorSales;
