'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]"
        >
          The future of shopping is <span className="text-primary">conversational.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Experience a personalized luxury boutique powered by artificial intelligence that understands your aesthetic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group max-w-2xl mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-full blur opacity-25 group-focus-within:opacity-100 transition duration-500"></div>
          <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-full shadow-lg p-2 focus-within:ring-2 ring-primary/20 transition-all border border-slate-100">
            <div className="pl-5 text-primary">
              <Sparkles className="size-6" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What can I find for you today?"
              className="w-full bg-transparent border-none focus:ring-0 text-lg py-4 px-4 text-slate-800 placeholder:text-slate-400"
            />
            <button type="submit" className="bg-primary text-white rounded-full px-8 py-3.5 font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
              <span>Search</span>
              <ArrowRight className="size-4" />
            </button>
          </form>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">
          <span>Try: &quot;A linen suit for a summer wedding in Tuscany&quot;</span>
        </div>
      </div>
    </section>
  )
}
