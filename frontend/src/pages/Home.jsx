import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronDown, Award, Users, Utensils, Clock, ShieldCheck } from 'lucide-react';
import QuickActionBar from '../components/QuickActionBar';
import { getMenuItems } from '../services/api';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [popularDishes, setPopularDishes] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getMenuItems({ popular_only: true })
      .then((res) => setPopularDishes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-brand-charcoal text-brand-cream min-h-screen pb-16 lg:pb-0">
      <section className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80" alt="Mandi Spread" className="w-full h-full object-cover object-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/70 to-brand-charcoal/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          <span className="inline-block text-brand-gold text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-3 px-3 py-1 border border-brand-gold/30 rounded-full bg-brand-charcoal/60 backdrop-blur-sm">
            Kurnool's Premier Mandi & Arabian Dining
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-cream mb-2 leading-tight">MALIK LOTUS</h1>
          <h2 className="font-serif text-2xl sm:text-4xl text-brand-gold italic font-normal mb-2">RESTAURANT</h2>
          <h3 className="font-telugu text-xl sm:text-2xl text-brand-offwhite mb-6">మాలిక్ లోటస్ రెస్టారెంట్</h3>

          <p className="font-serif text-lg sm:text-2xl text-brand-offwhite italic max-w-2xl mx-auto mb-4">"Where Flavor Brings Everyone Together."</p>
          <p className="text-xs sm:text-sm text-brand-subtext max-w-xl mx-auto mb-8 font-light">Authentic Arabian & Indian flavors crafted with passion in the heart of Kurnool.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/order" className="w-full sm:w-auto bg-brand-gold hover:bg-brand-goldHover text-brand-charcoal font-bold text-sm px-8 py-3.5 rounded shadow-xl transition-all">ORDER ONLINE</Link>
            <Link to="/menu" className="w-full sm:w-auto bg-transparent hover:bg-brand-cardBg text-brand-cream font-semibold text-sm px-8 py-3.5 rounded border border-brand-gold/60 transition-all">EXPLORE MENU</Link>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto pt-6 border-t border-brand-border/40 backdrop-blur-sm bg-brand-charcoal/30 rounded-xl p-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-brand-gold text-sm sm:text-base font-bold">
                <Star className="w-4 h-4 fill-brand-gold" />
                <span>4.1</span>
              </div>
              <p className="text-[10px] sm:text-xs text-brand-subtext">6,193+ Reviews</p>
            </div>
            <div className="text-center border-x border-brand-border/40">
              <p className="text-sm sm:text-base font-bold text-brand-cream">₹200–₹600</p>
              <p className="text-[10px] sm:text-xs text-brand-subtext">Per Person</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold text-brand-cream">Dine-in • Takeaway</p>
              <p className="text-[10px] sm:text-xs text-brand-subtext">Delivery Available</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-center animate-bounce">
          <span className="text-[10px] tracking-[0.2em] text-brand-subtext block mb-1">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4 text-brand-gold mx-auto" />
        </div>
      </section>

      <QuickActionBar />

      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase">Welcome to Kurnool's Dining Destination</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-cream leading-tight">A TABLE FULL <br /><span className="text-brand-gold italic">OF FLAVOR</span></h2>
            <p className="text-brand-offwhite text-sm sm:text-base leading-relaxed">Welcome to Malik Lotus Restaurant. From aromatic mandi and flavorful biryani to sizzling starters and comforting classics, we bring together flavors made for sharing.</p>
            <p className="text-brand-subtext text-xs sm:text-sm leading-relaxed">Whether you're joining us with family, friends or simply craving a satisfying meal, there's something waiting for you at Malik Lotus.</p>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-brand-border shadow-2xl">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" alt="Ambiance" className="w-full h-[420px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase">Our Signatures</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream mt-2">CUSTOMER FAVORITES</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDishes.slice(0, 6).map((dish) => (
            <div key={dish.id} className="bg-brand-cardBg border border-brand-border rounded-xl overflow-hidden shadow-lg flex flex-col justify-between">
              <div>
                <img src={dish.image_url || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'} alt={dish.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-bold text-brand-cream">{dish.name}</h3>
                    <span className="text-sm font-bold text-brand-gold">{dish.price ? `₹${dish.price}` : 'View Price'}</span>
                  </div>
                  <p className="text-xs text-brand-subtext leading-relaxed line-clamp-2 mb-4">{dish.description}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button onClick={() => addToCart(dish)} className="w-full bg-brand-navyDark hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream text-xs font-bold py-2.5 rounded border border-brand-border transition-colors">ADD TO ORDER</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
