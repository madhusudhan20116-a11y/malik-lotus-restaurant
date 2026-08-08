import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, BookOpen, ShoppingBag, MapPin } from 'lucide-react';

const MobileStickyBar = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-charcoal/95 border-t border-brand-border backdrop-blur-lg px-2 py-2.5">
      <div className="grid grid-cols-4 gap-1 text-center">
        <a href="tel:07842020777" className="flex flex-col items-center justify-center text-brand-subtext hover:text-brand-gold py-1">
          <Phone className="w-4 h-4 text-brand-gold mb-1" />
          <span className="text-[10px] font-semibold tracking-wider">CALL</span>
        </a>

        <Link to="/menu" className="flex flex-col items-center justify-center text-brand-subtext hover:text-brand-gold py-1">
          <BookOpen className="w-4 h-4 text-brand-gold mb-1" />
          <span className="text-[10px] font-semibold tracking-wider">MENU</span>
        </Link>

        <Link to="/order" className="flex flex-col items-center justify-center bg-brand-gold text-brand-charcoal rounded py-1 font-bold shadow">
          <ShoppingBag className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-wider">ORDER</span>
        </Link>

        <a href="https://maps.google.com/?q=R2HQ%2BXQ+Kurnool,+Andhra+Pradesh" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center text-brand-subtext hover:text-brand-gold py-1">
          <MapPin className="w-4 h-4 text-brand-gold mb-1" />
          <span className="text-[10px] font-semibold tracking-wider">MAP</span>
        </a>
      </div>
    </div>
  );
};

export default MobileStickyBar;
