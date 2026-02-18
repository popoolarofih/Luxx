import { Star, CheckCircle } from 'lucide-react';

export function ProductInfo({ product }: { product: any }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
        </div>
        <span className="text-sm font-medium text-slate-500">4.8 (1,240 reviews)</span>
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{product.name}</h1>
      <p className="text-3xl font-bold text-primary mt-4">${product.price}</p>
      <p className="text-sm font-medium text-green-600 flex items-center gap-1 mt-2">
        <CheckCircle className="size-4" />
        In stock, ready to ship
      </p>

      <div className="pt-6">
        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-full shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center justify-center gap-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
