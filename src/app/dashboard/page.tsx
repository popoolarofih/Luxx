import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { User, Mail, ShoppingBag, Ruler, Shield, LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        {/* Profile Hero */}
        <section className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="size-32 rounded-full border-4 border-white dark:border-slate-800 shadow-xl bg-slate-200 overflow-hidden flex items-center justify-center">
               <User className="size-16 text-slate-400" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight mb-1">Alex Johnson</h1>
              <p className="text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start gap-2">
                <Mail className="size-4" />
                alex.johnson@example.com
              </p>
              <div className="mt-3 flex gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">Premium Member</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:shadow-lg transition-all active:scale-95">
            Edit Profile
          </button>
        </section>

        {/* Dashboard Tabs */}
        <nav className="flex gap-8 border-b border-slate-200 dark:border-slate-800 mb-10 overflow-x-auto whitespace-nowrap">
          <a className="pb-4 border-b-2 border-primary text-primary font-bold flex items-center gap-2" href="#">
            <LayoutDashboard className="size-5" />
            Overview
          </a>
          <a className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2" href="#">
            <ShoppingBag className="size-5" />
            Order History
          </a>
          <a className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2" href="#">
            <Ruler className="size-5" />
            Sizing
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h3 className="text-xl font-bold tracking-tight mb-6">Your AI Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                   <h4 className="font-bold mb-1">Personalized Styling</h4>
                   <p className="text-sm text-slate-500">AI-curated looks based on your behavior.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                   <h4 className="font-bold mb-1">Smart Size Suggest</h4>
                   <p className="text-sm text-slate-500">Automatically select best fit for your profile.</p>
                </div>
              </div>
            </section>
          </div>
          <div className="lg:col-span-1">
             <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
               <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
               <p className="text-slate-500 text-sm italic">No recent activity found.</p>
             </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
