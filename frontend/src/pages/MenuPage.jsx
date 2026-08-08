import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { getCategories, getMenuItems } from '../services/api';
import { useCart } from '../context/CartContext';

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
    getMenuItems().then((res) => setMenuItems(res.data));

    const catParam = searchParams.get('category');
    if (catParam) setActiveCategory(catParam);
  }, [searchParams]);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category_id === categories.find((c) => c.name === activeCategory)?.id;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-brand-charcoal text-brand-cream min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">OUR DIGITAL MENU</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2">
          <button onClick={() => setActiveCategory('ALL')} className={`px-4 py-2 rounded text-xs font-bold ${activeCategory === 'ALL' ? 'bg-brand-gold text-brand-charcoal' : 'bg-brand-cardBg'}`}>ALL DISHES</button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.name)} className={`px-4 py-2 rounded text-xs font-bold ${activeCategory === cat.name ? 'bg-brand-gold text-brand-charcoal' : 'bg-brand-cardBg'}`}>{cat.name}</button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input type="text" placeholder="Search dishes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-brand-cardBg border border-brand-border rounded px-4 py-2 text-xs text-brand-cream focus:outline-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-brand-cardBg border border-brand-border rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex gap-4 mb-4">
                <img src={item.image_url || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80'} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <h3 className="font-serif font-bold text-brand-cream text-base">{item.name}</h3>
                  <p className="text-sm font-bold text-brand-gold">{item.price ? `₹${item.price}` : 'View Price'}</p>
                </div>
              </div>
              <p className="text-xs text-brand-subtext line-clamp-2 mb-4">{item.description}</p>
            </div>
            <button onClick={() => addToCart(item)} className="bg-brand-gold text-brand-charcoal text-xs font-bold py-2 rounded flex items-center justify-center gap-1"><Plus className="w-3.5 h-3.5" /> ADD TO ORDER</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
