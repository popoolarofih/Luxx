import Link from 'next/link'
import { ShoppingBag, User, Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <Sparkles className="size-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">AI LUXE</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 ml-4">
            <Link href="/explore" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Explore</Link>
            <Link href="/trends" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Trends</Link>
            <Link href="/guide" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">AI Guide</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-700">
            <ShoppingBag className="size-5" />
          </button>
          <Link href="/dashboard" className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700">
            <User className="size-5" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
