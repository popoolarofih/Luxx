import { ArrowRight, Heart } from 'lucide-react'

export function CuratedCollection() {
  const products = [
    { name: 'Linen Structured Blazer', price: '$850', collection: 'Ethereal Collection' },
    { name: 'Calfskin Chelsea Boots', price: '$1,200', collection: 'Signature Series' },
    { name: 'Raw Silk Wrap Dress', price: '$640', collection: 'The Essentials' },
    { name: 'Archival Tote Bag', price: '$2,450', collection: 'Limited Edition' },
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
        {products.map((p, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden mb-4 shadow-sm relative">
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="size-4" />
              </div>
            </div>
            <h4 className="font-semibold text-slate-800 group-hover:text-primary transition-colors">{p.name}</h4>
            <p className="text-slate-500 text-sm mb-1">{p.collection}</p>
            <p className="font-bold text-slate-900">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
