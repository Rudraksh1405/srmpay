import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Store } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import { getVendors } from '../../api';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await getVendors();
        setVendors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Campus Outlets</h1>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search vendors or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-srm-orange glass"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass rounded-2xl overflow-hidden h-64 flex flex-col">
              <Skeleton className="h-32 rounded-none" />
              <div className="p-4 flex-1 flex flex-col gap-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3 mt-auto" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredVendors.length === 0 ? (
        <EmptyState message="No vendors found matching your search." icon={Store} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <Link to={`/student/vendor/${vendor._id}`} key={vendor._id}>
              <GlassCard noPadding className="h-full flex flex-col hover:-translate-y-1 hover:shadow-2xl transition-all cursor-pointer overflow-hidden group">
                <div className="h-32 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-1">{vendor.name}</h3>
                  <p className="text-sm text-srm-orange font-medium mb-3">{vendor.category}</p>
                  <div className="mt-auto flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={16} className="mr-1" /> {vendor.location}
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;
