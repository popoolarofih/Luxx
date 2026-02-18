import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchResults } from '@/components/SearchResults';
import { searchProducts } from '@/lib/ai/tools';

export const dynamic = 'force-dynamic';

export default async function ExplorePage() {
  // Default exploration results
  const results = await searchProducts('premium luxury minimalist');

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Explore LUXE</h1>
          <p className="text-slate-500 text-lg">Discover curated collections powered by semantic understanding.</p>
        </div>
        <SearchResults query="Curated for you" results={results} />
      </main>
      <Footer />
    </div>
  );
}
