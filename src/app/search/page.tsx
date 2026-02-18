import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { searchProducts } from '@/lib/ai/tools';
import { SearchResults } from '@/components/SearchResults';

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q: string }>
}) {
  const params = await searchParams;
  const query = params.q || '';
  const results = query ? await searchProducts(query) : [];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <SearchResults query={query} results={results} />
      </main>
      <Footer />
    </div>
  );
}
