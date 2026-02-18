'use client';

import { ArrowRight, Heart } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import Link from 'next/link'

export function CuratedCollection() {
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const products = [
    { id: '1', name: 'Linen Structured Blazer', price: 850, collection: 'Ethereal Collection' },
    { id: '2', name: 'Calfskin Chelsea Boots', price: 1200, collection: 'Signature Series' },
    { id: '3', name: 'Raw Silk Wrap Dress', price: 640, collection: 'The Essentials' },
    { id: '4', name: 'Archival Tote Bag', price: 2450, collection: 'Limited Edition' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Curated for You</h2>
          <p className="text-slate-500">Based on your recent search for &quot;minimalist textures&quot;.</p>
        </div>
        <a className="group flex items-center gap-2 text-primary font-bold" href="#">
          <span>View All</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden mb-4 shadow-sm relative">
              <Link href={`/product/${p.id}`} className="absolute inset-0 z-0" />
              <button
                onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity z-10 ${wishlist.includes(p.id) ? 'text-red-500 fill-current' : ''}`}
              >
                <Heart className="size-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 z-10 shadow-lg shadow-primary/20"
              >
                Add to Cart
              </button>
            </div>
            <Link href={`/product/${p.id}`}>
              <h4 className="font-semibold text-slate-800 group-hover:text-primary transition-colors">{p.name}</h4>
              <p className="text-slate-500 text-sm mb-1">{p.collection}</p>
              <p className="font-bold text-slate-900">${p.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
