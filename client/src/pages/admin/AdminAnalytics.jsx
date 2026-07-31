import React, { useState, useEffect } from 'react';
import { IndianRupee, PieChart as PieChartIcon } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Skeleton from '../../components/Skeleton';
import { getAdminAnalytics } from '../../api';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAdminAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Platform Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Platform Analytics</h1>
      <p className="text-slate-500 mb-6">Overall Platform Performance</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="flex items-center gap-6 p-8 border-l-4 border-l-srm-blue">
          <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-4 rounded-2xl">
            <IndianRupee size={32} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Total Gross Revenue</p>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white">₹{analytics.totalRevenue.toLocaleString()}</h2>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-6 p-8 border-l-4 border-l-indigo-500">
          <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 p-4 rounded-2xl">
            <PieChartIcon size={32} />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Total Orders Processed</p>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white">{analytics.totalOrders}</h2>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminAnalytics;
