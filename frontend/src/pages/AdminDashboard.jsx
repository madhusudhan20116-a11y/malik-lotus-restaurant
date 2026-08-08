import React, { useState, useEffect } from 'react';
import { adminLogin, getAdminOrders, updateOrderStatus, getMenuItems, createMenuItem, deleteMenuItem } from '../services/api';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (token) {
      getAdminOrders().then((res) => setOrders(res.data)).catch(console.error);
      getMenuItems().then((res) => setMenuItems(res.data)).catch(console.error);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({ username, password });
      localStorage.setItem('admin_token', res.data.access_token);
      setToken(res.data.access_token);
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  if (!token) {
    return (
      <div className="bg-brand-charcoal text-brand-cream min-h-screen flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-brand-cardBg p-8 rounded-xl border border-brand-border max-w-sm w-full space-y-4">
          <h2 className="font-serif font-bold text-xl text-center text-brand-gold">Admin Portal</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-brand-charcoal border border-brand-border p-2 text-xs rounded text-brand-cream" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-brand-charcoal border border-brand-border p-2 text-xs rounded text-brand-cream" />
          <button type="submit" className="w-full bg-brand-gold text-brand-charcoal font-bold text-xs py-2.5 rounded">LOGIN</button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-brand-charcoal text-brand-cream min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <h1 className="font-serif text-2xl font-bold mb-6">ADMIN DASHBOARD</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-brand-cardBg p-4 rounded-xl border border-brand-border flex justify-between items-center">
            <div>
              <span className="font-bold text-brand-gold">Order #{o.id}</span>
              <p className="text-xs text-brand-offwhite">Total: ₹{o.total_amount} | {o.customer_name}</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-brand-navyDark border border-brand-border rounded">{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
