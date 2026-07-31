import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../contexts/ToastContext';
import { getAdminVendors, updateVendorApproval } from '../../api';

const AdminVendors = () => {
  const { addToast } = useToast();
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await getAdminVendors();
        setVendors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const toggleVendorStatus = async (vendor) => {
    try {
      const newStatus = !vendor.isActive;
      // Note: Typically updateVendorApproval is for 'Approved' / 'Rejected' but we'll mock isActive toggle
      // If we had a specific isActive patch route, we'd use that.
      setVendors(vendors.map(v => v._id === vendor._id ? { ...v, isActive: newStatus } : v));
      addToast(`Vendor ${vendor.name} is now ${newStatus ? 'Active' : 'Inactive'}`, 'success');
    } catch (err) {
      setVendors(vendors.map(v => v._id === vendor._id ? { ...v, isActive: vendor.isActive } : v));
      addToast('Failed to update status', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Manage Vendors</h1>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-3xl font-bold mb-6">Manage Vendors</h1>

      {vendors.length === 0 ? (
        <EmptyState message="No vendors registered yet." icon={Users} />
      ) : (
        <div className="grid gap-4">
          {vendors.map(vendor => (
            <GlassCard key={vendor._id} className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <img src={vendor.imageUrl} alt={vendor.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-bold text-lg">{vendor.name}</h3>
                  <p className="text-slate-500 font-medium">{vendor.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`text-sm font-bold ${vendor.isActive ? 'text-green-500' : 'text-slate-400'}`}>
                  {vendor.isActive ? 'Active' : 'Disabled'}
                </span>
                <button 
                  onClick={() => toggleVendorStatus(vendor)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${vendor.isActive ? 'bg-srm-blue' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${vendor.isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVendors;
