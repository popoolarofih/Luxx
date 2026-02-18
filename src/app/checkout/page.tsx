'use client';

import { ArrowLeft, Sparkles, Truck, Wallet, Lock, Shield, History, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useStore();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  const handlePurchase = async () => {
    setIsPurchasing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPurchasing(false);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light p-6 text-center">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl shadow-xl max-w-md w-full">
           <div className="bg-green-100 text-green-600 size-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="size-10" />
           </div>
           <h1 className="text-3xl font-black mb-4 dark:text-white">Order Confirmed!</h1>
           <p className="text-slate-500 mb-8">Thank you for your purchase. Your AI-curated selection is on its way.</p>
           <Link href="/" className="inline-block w-full bg-primary text-white px-8 py-4 rounded-full font-bold">
              Back to Home
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/10 z-50">
        <div className="h-full bg-primary" style={{ width: cart.length > 0 ? '75%' : '25%' }}></div>
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
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 dark:text-white">Review & Pay</h1>
          <p className="text-lg text-slate-500">We&apos;ve pre-filled your details from your profile for a 30-second checkout.</p>
        </header>

        <div className="space-y-12">
          <section className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
              <ShoppingBag className="size-5" />
              Your Cart ({cart.length})
            </h3>
            {cart.length === 0 ? (
              <p className="text-slate-500 italic">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div className="flex items-center gap-4">
                       <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="size-6 text-slate-400" />
                       </div>
                       <div>
                          <p className="font-bold text-sm dark:text-white">{item.name}</p>
                          <p className="text-xs text-slate-500">${item.price} x {item.quantity}</p>
                       </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                       <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
                <div className="pt-4 flex justify-between items-center">
                  <span className="font-bold dark:text-white">Total</span>
                  <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
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
              <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <Wallet className="size-5 text-primary" />
                Payment
              </h2>
              <button className="text-primary font-semibold text-sm hover:bg-primary/5 px-3 py-1 rounded-full transition-all">Edit Card</button>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-8 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center font-bold text-[8px] dark:text-white">
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
            <button
              onClick={handlePurchase}
              disabled={isPurchasing || cart.length === 0}
              className="w-full bg-primary hover:bg-primary/90 text-white text-xl font-black py-6 rounded-full shadow-xl shadow-primary/20 transition-all active:scale-[0.98] mb-6 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPurchasing ? 'Processing...' : `Complete Purchase • $${total.toFixed(2)}`}
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
