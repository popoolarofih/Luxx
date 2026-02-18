import { MessageSquare, Eye } from 'lucide-react'

export function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-slate-100 border border-slate-200/50">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-10 w-full text-white z-20">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="size-4" />
              AI Native
            </div>
            <h3 className="text-3xl font-bold mb-3">Conversational Search</h3>
            <p className="text-white/80 text-lg leading-relaxed max-w-sm">
              Talk to your wardrobe. Describe moods, events, or textures to find exactly what you imagine.
            </p>
          </div>
        </div>
        <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-slate-100 border border-slate-200/50">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-10 w-full text-white z-20">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Eye className="size-4" />
              Vision Core
            </div>
            <h3 className="text-3xl font-bold mb-3">Visual Recommendations</h3>
            <p className="text-white/80 text-lg leading-relaxed max-w-sm">
              AI that understands your unique aesthetic through visual patterns, not just your clicks.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
