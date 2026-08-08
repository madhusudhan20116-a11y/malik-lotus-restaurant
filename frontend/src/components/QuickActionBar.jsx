import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Phone, MapPin, MessageCircle } from 'lucide-react';

const QuickActionBar = () => {
  return (
    <div className="bg-brand-navyDark border-y border-brand-border py-4 px-4 sm:px-8 sticky top-[68px] z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link to="/order" className="flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-goldHover text-brand-charcoal font-bold text-xs py-3 rounded shadow transition-colors">
          <ShoppingBag className="w-4 h-4" />
          <span>ORDER ONLINE</span>
        </Link>

        <a href="tel:07842020777" className="flex items-center justify-center gap-2 bg-brand-cardBg hover:bg-brand-border text-brand-cream font-semibold text-xs py-3 rounded border border-brand-border transition-colors">
          <Phone className="w-4 h-4 text-brand-gold" />
          <span>CALL NOW</span>
        </a>

        <a href="https://maps.google.com/?q=R2HQ%2BXQ+Kurnool,+Andhra+Pradesh" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-brand-cardBg hover:bg-brand-border text-brand-cream font-semibold text-xs py-3 rounded border border-brand-border transition-colors">
          <MapPin className="w-4 h-4 text-brand-gold" />
          <span>GET DIRECTIONS</span>
        </a>

        <a href="https://wa.me/917842020777?text=Hello%20Malik%20Lotus%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation/order." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 font-semibold text-xs py-3 rounded border border-emerald-700/50 transition-colors">
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
};

export default QuickActionBar;
