import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary text-white p-1 rounded-lg">
                <Sparkles className="size-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">AI LUXE</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Redefining the luxury retail experience through the lens of artificial intelligence.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6">Explore</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">New Arrivals</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Style Guide</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Brand Stories</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Support</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Size Guide</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Concierge Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Connect</h5>
            <p className="text-xs text-slate-400">© 2024 AI Luxe. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
