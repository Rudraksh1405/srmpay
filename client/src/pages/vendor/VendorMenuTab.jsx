import React, { useState, useEffect } from 'react';
import { Search, UtensilsCrossed } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { getVendorMenu, updateMenuAvailability } from '../../api';

const VendorMenuTab = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getVendorMenu(user._id);
        setMenu(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, [user._id]);

  const toggleAvailability = async (item) => {
    try {
      const newStatus = !item.isAvailable;
      // Optimistic update
      setMenu(menu.map(m => m._id === item._id ? { ...m, isAvailable: newStatus } : m));
      await updateMenuAvailability(item._id, newStatus);
      addToast(`${item.name} marked as ${newStatus ? 'Available' : 'Out of Stock'}`, 'success');
    } catch (err) {
      // Revert on error
      setMenu(menu.map(m => m._id === item._id ? { ...m, isAvailable: item.isAvailable } : m));
      addToast('Failed to update status', 'error');
    }
  };

  const filteredMenu = menu.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Menu Management</h1>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search your menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-srm-green glass"
          />
        </div>
      </div>

      {filteredMenu.length === 0 ? (
        <EmptyState message="No menu items found." icon={UtensilsCrossed} />
      ) : (
        <div className="grid gap-4">
          {filteredMenu.map(item => (
            <GlassCard key={item._id} className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} alt={item.name} className={`w-16 h-16 rounded-lg object-cover ${!item.isAvailable && 'grayscale opacity-50'}`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 border flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    </div>
                    <h3 className={`font-bold text-lg ${!item.isAvailable && 'text-slate-400 line-through'}`}>{item.name}</h3>
                  </div>
                  <p className="text-slate-500 font-medium font-mono">₹{item.price}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                  {item.isAvailable ? 'Available' : 'Out of Stock'}
                </span>
                {/* Custom Toggle Switch */}
                <button 
                  onClick={() => toggleAvailability(item)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${item.isAvailable ? 'bg-srm-green' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${item.isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorMenuTab;
