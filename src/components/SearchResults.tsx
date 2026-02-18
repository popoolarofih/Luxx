'use client';

import { Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';

export function SearchResults({ query, results }: { query: string, results: any[] }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  return (
    <>
      <section className="max-w-3xl mx-auto text-center mb-20">
        <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          Find exactly what you&apos;re looking for.
        </h2>
        <p className="text-slate-500 text-lg mb-10">Our AI understands context, not just keywords. Describe your ideal product in plain English.</p>

        <div className="relative group rounded-full transition-all duration-300 shadow-xl">
           {/* Reuse Search Input UI if needed */}
        </div>
      </section>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Showing results for <span className="text-primary italic font-medium">&quot;{query}&quot;</span>
          </h3>
          <p className="text-slate-500 text-sm mt-1">{results.length} products matched your semantic intent</p>
        </div>
        <div className="flex items-center gap-3 bg-white/50 p-2 rounded-full border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 mr-2">Sort by AI Relevance</span>
          <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold shadow-md">Most Relevant</button>
          <button className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-full text-sm font-semibold transition-all">High Quality</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {results.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300 relative"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Link href={`/product/${p.id}`} className="absolute inset-0 z-0" />
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Product Image</span>
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  {Math.round((p.similarity || 0.95) * 100)}% Match
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity z-10 ${wishlist.includes(p.id) ? 'text-red-500 fill-current' : ''}`}
              >
                <Heart className="size-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 z-10 shadow-lg shadow-primary/20"
              >
                <ShoppingBag className="size-4" />
              </button>
            </div>
            <div className="p-6">
              <Link href={`/product/${p.id}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">{p.name}</h4>
                  <span className="font-bold text-slate-900 dark:text-white">${p.price}</span>
                </div>
              </Link>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{p.description}</p>
              <div className="bg-primary/5 rounded-lg p-3 flex gap-2 items-start">
                <Sparkles className="size-4 text-primary mt-0.5 shrink-0" />
                <p className="text-[11px] leading-tight text-primary/80 font-medium">
                  {p.metadata?.ai_insight || "Matches your search intent with high relevance to your specified needs."}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
