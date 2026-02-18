import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function TrendsPage() {
  const trends = [
    { title: 'Sustainable Tech', growth: '+24%', description: 'Eco-friendly devices are seeing a massive surge this season.' },
    { title: 'Minimalist Workspaces', growth: '+18%', description: 'Clean lines and clutter-free desk setups are dominating the office category.' },
    { title: 'Smart Apparel', growth: '+12%', description: 'Integrating technology with luxury fashion for everyday comfort.' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <TrendingUp className="size-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">AI-Driven Trends</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trends.map((trend, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-primary/50 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{trend.title}</h2>
                <span className="text-green-600 font-bold flex items-center gap-1">
                  {trend.growth} <ArrowUpRight className="size-4" />
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{trend.description}</p>
              <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                <Link href="/explore" className="text-primary text-sm font-bold hover:underline">Explore Collection</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
