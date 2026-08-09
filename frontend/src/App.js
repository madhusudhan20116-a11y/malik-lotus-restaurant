import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileStickyBar from './components/MobileStickyBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://YOUR-BACKEND-NAME.vercel.app/api';

const api = axios.create({ baseURL: API_BASE_URL });

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-brand-charcoal font-sans antialiased">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/order" element={<MenuPage />} />
              <Route path="/cart" element={<CheckoutPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <MobileStickyBar />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
