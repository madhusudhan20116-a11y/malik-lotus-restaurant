import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MENU', path: '/menu' },
    { name: 'ABOUT', path: '/about' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'REVIEWS', path: '/reviews' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-charcoal/95 backdrop-blur-md shadow-xl border-b border-brand-border/50 py-3' : 'bg-gradient-to-b from-brand-charcoal/90 via-brand-charcoal/40 to-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-cream flex items-center gap-1.5">
            MALIK LOTUS <span className="text-brand-gold text-xs font-sans tracking-widest px-1.5 py-0.5 rounded border border-brand-gold/40">RESTAURANT</span>
          </span>
          <span className="text-xs font-telugu text-brand-subtext tracking-wide">మాలిక్ లోటస్ రెస్టారెంట్</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-widest text-brand-offwhite">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={`hover:text-brand-gold transition-colors duration-200 ${location.pathname === link.path ? 'text-brand-gold border-b-2 border-brand-gold pb-1' : ''}`}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-5">
          <a href="tel:07842020777" className="flex items-center gap-2 text-xs font-semibold text-brand-offwhite hover:text-brand-gold transition-colors">
            <Phone className="w-4 h-4 text-brand-gold" />
            <span>078420 20777</span>
          </a>

          <Link to="/cart" className="relative p-2 text-brand-offwhite hover:text-brand-gold transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>}
          </Link>

          <Link to="/order" className="bg-brand-gold hover:bg-brand-goldHover text-brand-charcoal text-xs font-bold px-5 py-2.5 rounded shadow-lg transition-all transform hover:-translate-y-0.5">
            ORDER ONLINE
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <a href="tel:07842020777" className="text-brand-gold p-1"><Phone className="w-5 h-5" /></a>
          <Link to="/cart" className="relative text-brand-offwhite p-1">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>}
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-cream p-1 focus:outline-none">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-navyDark border-b border-brand-border px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold tracking-wider text-brand-offwhite hover:text-brand-gold">
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-brand-border flex flex-col gap-3">
            <Link to="/order" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-brand-gold text-brand-charcoal font-bold text-xs py-3 rounded">
              ORDER ONLINE
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
