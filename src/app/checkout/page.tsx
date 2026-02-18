import { ArrowLeft, Sparkles, Truck, Wallet, Lock, Shield, History } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/10 z-50">
        <div className="h-full bg-primary" style={{ width: '75%' }}></div>
      </div>
      <div className="max-w-[640px] mx-auto px-6 py-12 md:py-20">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
              <ArrowLeft className="size-4" />
              Back to Shop
            </Link>
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-3" />
              AI Optimized
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Review & Pay</h1>
          <p className="text-lg text-slate-500">We&apos;ve pre-filled your details from your profile for a 30-second checkout.</p>
        </header>

        <div className="space-y-12">
          <section className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">$1,249.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">3 Items in cart</p>
              <button className="text-primary text-sm font-bold hover:underline">View details</button>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Truck className="size-5 text-primary" />
                Shipping Address
              </h2>
              <button className="text-primary font-semibold text-sm hover:bg-primary/5 px-3 py-1 rounded-full transition-all">Change</button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-slate-800 border-2 border-primary/20 rounded-xl p-6 shadow-sm">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">Alex Johnson</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  123 Innovation Drive, Suite 400<br/>
                  San Francisco, CA 94105<br/>
                  United States
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Wallet className="size-5 text-primary" />
                Payment
              </h2>
              <button className="text-primary font-semibold text-sm hover:bg-primary/5 px-3 py-1 rounded-full transition-all">Edit Card</button>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-8 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center font-bold text-[10px]">
                VISA
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white leading-none">Visa ending in 4242</p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">Expires 12/26</p>
              </div>
              <Lock className="size-4 text-slate-300" />
            </div>
          </section>

          <section className="pt-8">
            <button className="w-full bg-primary hover:bg-primary/90 text-white text-xl font-black py-6 rounded-full shadow-xl shadow-primary/20 transition-all active:scale-[0.98] mb-6 flex items-center justify-center gap-3">
              Complete Purchase • $1,249.00
            </button>
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                <Shield className="size-3" />
                Secure SSL
              </div>
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                <Shield className="size-3" />
                Fraud Protected
              </div>
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                <History className="size-3" />
                30-Day Returns
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
