import React, { useState, useEffect } from 'react';
import { FileQuestion, Check, X } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../contexts/ToastContext';
import { getAdminRequests, updateVendorApproval } from '../../api';

const AdminRequests = () => {
  const { addToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAdminRequests();
        setRequests(data.filter(r => r.approvalStatus === 'Pending'));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await updateVendorApproval(id, decision);
      setRequests(requests.filter(r => r._id !== id));
      addToast(`Request ${decision} successfully`, 'success');
    } catch (err) {
      addToast(`Failed to ${decision.toLowerCase()} request`, 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Pending Requests</h1>
        <div className="grid gap-4">
          {[1, 2].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Pending Requests</h1>

      {requests.length === 0 ? (
        <EmptyState message="No pending vendor requests." icon={FileQuestion} />
      ) : (
        <div className="grid gap-4">
          {requests.map(req => (
            <GlassCard key={req._id} className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
              <div>
                <h3 className="font-bold text-xl mb-1">{req.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{req.category}</p>
                <p className="text-sm text-slate-500 mt-2">Location: {req.location}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="danger" onClick={() => handleDecision(req._id, 'Rejected')} className="px-3">
                  <X size={20} /> Reject
                </Button>
                <Button variant="secondary" onClick={() => handleDecision(req._id, 'Approved')} className="px-3">
                  <Check size={20} /> Approve
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
