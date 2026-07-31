import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Loader2 } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { createOrder } from '../../api';

const Checkout = () => {
  const [method, setMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems, cartTotal, vendorId, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const total = cartTotal + 5;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const orderData = {
        studentEmail: user.email,
        vendorId,
        items: cartItems.map(i => ({ menuItemId: i._id, name: i.name, price: i.price, qty: i.qty })),
        totalAmount: total
      };
      
      const order = await createOrder(orderData);
      
      addToast('Payment Successful ✅', 'success');
      clearCart();
      navigate(`/student/order/${order.tokenNumber}`);
      
    } catch (err) {
      addToast('Payment failed', 'error');
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/student');
    return null;
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <GlassCard className="text-center bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          Test Mode
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          This is a simulated payment gateway. No real money will be deducted.
        </p>
      </GlassCard>

      <GlassCard className="space-y-4">
        <h2 className="font-bold text-lg border-b border-slate-200 dark:border-slate-700 pb-2">Select Payment Method</h2>
        
        <div 
          className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer transition-colors ${method === 'upi' ? 'border-srm-orange bg-orange-50 dark:bg-orange-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-orange-300'}`}
          onClick={() => setMethod('upi')}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'upi' ? 'border-srm-orange' : 'border-slate-300'}`}>
            {method === 'upi' && <div className="w-2.5 h-2.5 bg-srm-orange rounded-full" />}
          </div>
          <Wallet className={method === 'upi' ? 'text-srm-orange' : 'text-slate-500'} />
          <span className="font-medium">UPI (GPay, PhonePe, Paytm)</span>
        </div>

        <div 
          className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer transition-colors ${method === 'card' ? 'border-srm-orange bg-orange-50 dark:bg-orange-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-orange-300'}`}
          onClick={() => setMethod('card')}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-srm-orange' : 'border-slate-300'}`}>
            {method === 'card' && <div className="w-2.5 h-2.5 bg-srm-orange rounded-full" />}
          </div>
          <CreditCard className={method === 'card' ? 'text-srm-orange' : 'text-slate-500'} />
          <span className="font-medium">Credit / Debit Card</span>
        </div>
      </GlassCard>

      <GlassCard className="flex justify-between items-center">
        <span className="text-lg font-medium">Amount to Pay</span>
        <span className="text-2xl font-bold text-srm-orange">₹{total}</span>
      </GlassCard>

      <Button 
        variant="primary" 
        className="w-full py-4 text-lg"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Processing Payment...
          </>
        ) : (
          `Pay ₹${total}`
        )}
      </Button>
    </div>
  );
};

export default Checkout;
