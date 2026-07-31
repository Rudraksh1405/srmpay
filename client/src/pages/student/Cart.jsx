import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { useCart } from '../../contexts/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, removeItem, clearCart, vendorId } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="pt-10">
        <EmptyState message="Your cart is empty" icon={ShoppingBag} />
        <div className="flex justify-center mt-6">
          <Button onClick={() => navigate('/student')}>Browse Vendors</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button onClick={clearCart} className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center gap-1">
          <Trash2 size={16} /> Clear All
        </button>
      </div>

      <GlassCard className="space-y-4">
        {cartItems.map(item => (
          <div key={item._id} className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-slate-500">₹{item.price} x {item.qty}</p>
            </div>
            <div className="font-bold text-lg">
              ₹{item.price * item.qty}
            </div>
            <button onClick={() => removeItem(item._id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </GlassCard>

      <GlassCard className="bg-srm-orange/5 border-srm-orange/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-600 dark:text-slate-300">Subtotal</span>
          <span className="font-semibold">₹{cartTotal}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-600 dark:text-slate-300">Platform Fee</span>
          <span className="font-semibold">₹5</span>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-center">
          <span className="text-xl font-bold">Total</span>
          <span className="text-2xl font-bold text-srm-orange">₹{cartTotal + 5}</span>
        </div>
      </GlassCard>

      <Button variant="primary" className="w-full py-4 text-lg" onClick={() => navigate('/student/checkout')}>
        Proceed to Checkout <ArrowRight size={20} />
      </Button>
    </div>
  );
};

export default Cart;
