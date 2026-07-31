import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShoppingCart, Info, Minus, Plus } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import { getVendors, getVendorMenu } from '../../api';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const VendorMenu = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { cartItems, addItem, removeItem, cartCount } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendors = await getVendors();
        const v = vendors.find(v => v._id === vendorId);
        setVendor(v);
        const m = await getVendorMenu(vendorId);
        setMenu(m);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [vendorId]);

  const filteredMenu = menu.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (item) => {
    addItem(item, vendorId);
    addToast(`Added ${item.name} to cart`);
  };

  const getQty = (itemId) => {
    const item = cartItems.find(i => i._id === itemId);
    return item ? item.qty : 0;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!vendor) return <EmptyState message="Vendor not found" />;

  return (
    <div className="space-y-8 pb-24">
      {/* Vendor Header */}
      <GlassCard noPadding className="overflow-hidden relative">
        <div className="h-48 w-full relative">
          <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 p-6 text-white w-full flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold mb-1">{vendor.name}</h1>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span className="bg-srm-orange/80 px-2 py-1 rounded-md">{vendor.category}</span>
              <span className="flex items-center"><MapPin size={16} className="mr-1" /> {vendor.location}</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Menu Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-[72px] z-30 py-4 glass rounded-2xl px-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-srm-orange"
          />
        </div>
      </div>

      {/* Menu Items */}
      {filteredMenu.length === 0 ? (
        <EmptyState message="No items found." icon={Info} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenu.map(item => {
            const qty = getQty(item._id);
            return (
              <GlassCard key={item._id} className={`flex gap-4 p-4 ${!item.isAvailable ? 'opacity-60 grayscale' : ''}`}>
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 border-2 flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                          <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                      </div>
                      <span className="font-semibold text-lg">₹{item.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    {!item.isAvailable ? (
                      <span className="text-red-500 text-sm font-medium">Out of stock</span>
                    ) : (
                      <div className="ml-auto">
                        {qty > 0 ? (
                          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                            <button onClick={() => removeItem(item._id)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"><Minus size={16} /></button>
                            <span className="font-bold w-4 text-center">{qty}</span>
                            <button onClick={() => handleAdd(item)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors text-srm-orange"><Plus size={16} /></button>
                          </div>
                        ) : (
                          <Button variant="primary" className="py-1 px-4 text-sm" onClick={() => handleAdd(item)}>
                            Add
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      )}

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md">
          <Button variant="primary" className="w-full flex justify-between items-center py-3 shadow-2xl" onClick={() => navigate('/student/cart')}>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded-md text-sm font-bold">{cartCount} items</span>
            </div>
            <span className="font-bold flex items-center gap-2">
              View Cart <ShoppingCart size={20} />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorMenu;
