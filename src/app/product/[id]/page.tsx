import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getProductDetails } from '@/lib/ai/tools';
import { ProductInfo } from '@/components/ProductInfo';
import { AISummary } from '@/components/AISummary';

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <nav className="flex mb-8 text-sm font-medium text-slate-500">
          <span>Explore</span>
          <span className="mx-2">/</span>
          <span>{product.category || 'Products'}</span>
          <span className="mx-2">/</span>
          <span className="text-slate-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center overflow-hidden">
               <div className="text-slate-400 font-bold uppercase tracking-widest">Product Image</div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <ProductInfo product={product} />
            <AISummary product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
