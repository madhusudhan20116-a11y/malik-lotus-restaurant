import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: '', customer_phone: '', customer_email: '',
    delivery_address: '', area: '', pincode: '',
    order_type: 'Delivery', payment_method: 'Cash on Delivery',
  });

  const deliveryFee = formData.order_type === 'Delivery' ? 40 : 0;
  const totalAmount = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      const res = await createOrder({
        ...formData, subtotal, delivery_fee: deliveryFee, total_amount: totalAmount,
        items: cart.map((item) => ({ menu_item_id: item.id, quantity: item.quantity, unit_price: item.price || 0 }))
      });
      clearCart();
      alert(`Order Placed Successfully! Order ID: #${res.data.id}`);
      navigate('/');
    } catch (err) {
      alert('Failed to place order.');
    }
  };

  return (
    <div className="bg-brand-charcoal text-brand-cream min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl font-bold mb-8">CHECKOUT</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4 bg-brand-cardBg p-6 rounded-xl border border-brand-border">
          <input type="text" placeholder="Full Name" required value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})} className="w-full bg-brand-charcoal p-2.5 text-xs rounded border border-brand-border" />
          <input type="tel" placeholder="Phone Number" required value={formData.customer_phone} onChange={(e) => setFormData({...formData, customer_phone: e.target.value})} className="w-full bg-brand-charcoal p-2.5 text-xs rounded border border-brand-border" />
          <textarea placeholder="Delivery Address" required value={formData.delivery_address} onChange={(e) => setFormData({...formData, delivery_address: e.target.value})} className="w-full bg-brand-charcoal p-2.5 text-xs rounded border border-brand-border" />
        </div>
        <div className="bg-brand-cardBg p-6 rounded-xl border border-brand-border space-y-4 h-fit">
          <h2 className="font-bold text-lg text-brand-gold">Total: ₹{totalAmount}</h2>
          <button type="submit" className="w-full bg-brand-gold text-brand-charcoal font-bold text-xs py-3 rounded">PLACE ORDER</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
