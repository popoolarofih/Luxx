import { Sparkles } from 'lucide-react';

export function AISummary({ product }: { product: any }) {
  const summaries = product?.metadata?.ai_summary || [
    "Exceptional quality mentioned by most users.",
    "Best value for money in its category.",
    "Durable build suitable for long-term use."
  ];

  return (
    <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="size-16 text-primary" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="size-4 text-primary" />
        <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">AI Review Summary</h3>
      </div>
      <ul className="space-y-4">
        {summaries.map((s: string, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{s}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-6 border-t border-primary/10">
         <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Durability Score</span>
            <span className="text-sm font-bold text-primary">{product?.metadata?.durability_score || "9.2"}/10</span>
         </div>
      </div>
    </div>
  );
}
