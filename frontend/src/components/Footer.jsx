import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-navyDark text-brand-subtext border-t border-brand-border pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <span className="font-serif text-xl font-bold text-brand-cream block">
            MALIK LOTUS <span className="text-brand-gold text-xs font-sans">RESTAURANT</span>
          </span>
          <p className="font-telugu text-sm text-brand-offwhite">మాలిక్ లోటస్ రెస్టారెంట్</p>
          <p className="text-xs leading-relaxed">
            Authentic Arabian & Indian cuisine in Kurnool. Specialty mandi, biryani, and family dining.
          </p>
        </div>

        <div>
          <h4 className="font-serif font-bold text-brand-cream text-sm mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-brand-gold">Home</Link></li>
            <li><Link to="/menu" className="hover:text-brand-gold">Menu</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold">About</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-gold">Gallery</Link></li>
            <li><Link to="/reviews" className="hover:text-brand-gold">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-brand-cream text-sm mb-4">SERVICES</h4>
          <ul className="space-y-2 text-xs">
            <li>Dine-in</li>
            <li>Takeaway</li>
            <li>Delivery</li>
            <li>Online Ordering</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-brand-cream text-sm mb-4">CONTACT</h4>
          <p className="text-xs leading-relaxed mb-2">
            Plot No.106, Haji Gulam Hussain Arcade Building, First Floor, Park Road, Kurnool, AP 518001
          </p>
          <p className="text-xs text-brand-gold font-bold">078420 20777</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-brand-border/60 mt-12 pt-6 text-center text-[11px] text-brand-subtext">
        © 2026 Malik Lotus Restaurant. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
