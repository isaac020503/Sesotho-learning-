import React, { useState } from 'react';
import { MATERIALS } from '../data.ts';
import { Material } from '../types.ts';
import { BookOpen, Star, ArrowDownToLine, ShoppingCart, CheckCircle2, Award, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface MaterialsMarketplaceProps {
  purchasedMaterialIds: string[];
  onPurchased: (materialId: string) => void;
}

export default function MaterialsMarketplace({
  purchasedMaterialIds,
  onPurchased
}: MaterialsMarketplaceProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ebook' | 'audio' | 'flashcard' | 'grammar'>('all');
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [activeMethod, setActiveMethod] = useState<'paypal' | 'card' | null>(null);

  const filteredMaterials = MATERIALS.filter(item => {
    return activeFilter === 'all' || item.type === activeFilter;
  });

  const handleBuyResource = (id: string, method: 'paypal' | 'card') => {
    setBuyingId(id);
    setActiveMethod(method);
    const delay = method === 'paypal' ? 650 : 1600; // PayPal has ultra-fast billing!
    setTimeout(() => {
      onPurchased(id);
      setBuyingId(null);
      setActiveMethod(null);
    }, delay);
  };

  const handleDownloadSimulation = (title: string) => {
    alert(`Downloaded "${title}" successfully. Your Sotho handbook is ready !`);
  };

  return (
    <div className="space-y-8" id="materials-marketplace">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-display font-extrabold text-2xl text-slate-950">Study Store & Resource Hub</h3>
          <p className="text-sm text-slate-500 mt-1">Unlock self-paced learning guides, interactive audio packs, translation blueprints designed by local teachers.</p>
        </div>
      </div>

      {/* Categories filter tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3" id="materials-category-selector">
        {[
          { id: 'all', label: 'All Resources' },
          { id: 'ebook', label: 'E-Books' },
          { id: 'audio', label: 'Audio Guides' },
          { id: 'flashcard', label: 'Flashcards' },
          { id: 'grammar', label: 'Grammar Core' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all ${
              activeFilter === tab.id
                ? 'bg-slate-950 text-white'
                : 'bg-slate-50 text-slate-600 border border-slate-200/50 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Materials grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="materials-grid">
        {filteredMaterials.map((item: Material) => {
          const isPurchased = purchasedMaterialIds.includes(item.id);
          const isBuying = buyingId === item.id;
          
          return (
            <motion.div
              layout
              key={item.id}
              className={`rounded-2xl border bg-white p-5 shadow-sm transition-all flex flex-col justify-between ${
                isPurchased ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200'
              }`}
              id={`material-card-${item.id}`}
            >
              <div className="flex gap-4">
                {/* Book cover visual representator */}
                <div className="h-20 w-16 bg-slate-100 border border-slate-200/50 rounded-xl flex items-center justify-center text-3xl shadow-sm hover:scale-105 transition shrink-0 select-none">
                  {item.image}
                </div>

                {/* Details layout */}
                <div className="space-y-1.5">
                  <span className="inline-block rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[9px] text-amber-800 font-bold uppercase tracking-wider">
                    {item.type}
                  </span>
                  
                  <h4 className="font-sans font-bold text-slate-950 text-base leading-tight">
                    {item.title}
                  </h4>
                  
                  <p className="text-[11px] text-slate-400 font-medium font-mono">
                    Created by {item.author}
                  </p>
                  
                  <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-500">
                    <div className="flex items-center space-x-1 text-amber-500 font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                    <span>{item.sales} sold</span>
                  </div>
                </div>
              </div>

              {/* Description body parsed */}
              <p className="text-xs text-slate-600 font-normal leading-relaxed mt-4">
                {item.description}
              </p>

              {/* Action layout */}
              <div className="flex items-center justify-between border-t border-slate-100/80 pt-4 mt-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price</span>
                  {isPurchased ? (
                    <span className="text-emerald-600 text-xs font-bold font-mono">UNLOCKED</span>
                  ) : (
                    <span className="font-sans font-extrabold text-lg text-slate-900">${item.price.toFixed(2)}</span>
                  )}
                </div>

                {isPurchased ? (
                  <button
                    type="button"
                    onClick={() => handleDownloadSimulation(item.title)}
                    className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    <span>Download Resource</span>
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2" id={`materials-buy-actions-${item.id}`}>
                    {/* PayPal Express instant payment button */}
                    <button
                      type="button"
                      disabled={isBuying}
                      onClick={() => handleBuyResource(item.id, 'paypal')}
                      className={`flex items-center justify-center space-x-1 py-1.5 px-3 rounded-xl text-[11px] font-extrabold transition-all border shrink-0 ${
                        isBuying
                          ? buyingId === item.id && activeMethod === 'paypal'
                            ? 'bg-amber-400 border-amber-400 animate-pulse text-blue-950'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-amber-400 hover:bg-amber-500 border-amber-300 text-blue-950 hover:scale-[1.02] shadow-sm active:scale-95'
                      }`}
                    >
                      {isBuying && buyingId === item.id && activeMethod === 'paypal' ? (
                        <>
                          <Clock className="h-3.5 w-3.5 animate-spin text-blue-950" />
                          <span>Connecting...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-3.5 w-3.5 fill-blue-900 text-blue-900" />
                          <span>PayPal Fast Checkout</span>
                        </>
                      )}
                    </button>

                    {/* Credit Card payment button */}
                    <button
                      type="button"
                      disabled={isBuying}
                      onClick={() => handleBuyResource(item.id, 'card')}
                      className={`flex items-center justify-center space-x-1 py-1.5 px-3 rounded-xl text-[11px] font-semibold transition-all border shrink-0 ${
                        isBuying
                          ? buyingId === item.id && activeMethod === 'card'
                            ? 'bg-slate-900 text-white animate-pulse'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 hover:scale-[1.02] active:scale-95'
                      }`}
                    >
                      {isBuying && buyingId === item.id && activeMethod === 'card' ? (
                        <>
                          <Clock className="h-3.5 w-3.5 animate-spin text-white" />
                          <span>Authorizing Card...</span>
                        </>
                      ) : (
                        <span>Pay with Card</span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
