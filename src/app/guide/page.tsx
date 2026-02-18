import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Sparkles, BookOpen, MessageSquare, Zap } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">AI LUXE Guide</h1>
          <p className="text-slate-500 text-lg">Learn how to make the most of your AI shopping assistant.</p>
        </div>

        <div className="grid gap-8">
          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <MessageSquare className="size-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Conversational Shopping</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Instead of using filters and keywords, just talk to us. Tell us what you need, what the occasion is, or even the mood you&apos;re going for.
              Example: &quot;Find me a durable laptop for programming under $1500.&quot;
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Zap className="size-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Decision Engine</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our AI doesn&apos;t just list products; it helps you decide. It analyzes tradeoffs, explains why a product is recommended, and provides alternatives to ensure you make the best choice.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Sparkles className="size-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personalized Styling</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By understanding your unique aesthetic and preferences, LUXE curates a boutique experience tailored specifically to you.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
