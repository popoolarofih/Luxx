import { LayoutDashboard, TrendingUp, Package, Settings, Search, Bell, Sparkles, Brain } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 h-screen border-r border-primary/10 flex flex-col bg-white dark:bg-slate-900 transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <Brain className="size-6" />
          </div>
          <span className="text-xl font-black tracking-tight hidden lg:block">InsightAI</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <a className="flex items-center gap-4 px-4 py-3 bg-primary text-white rounded-full transition-all" href="#">
            <LayoutDashboard className="size-5" />
            <span className="font-medium hidden lg:block">Dashboard</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:bg-primary/10 hover:text-primary rounded-full transition-all" href="#">
            <TrendingUp className="size-5" />
            <span className="font-medium hidden lg:block">Analytics</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:bg-primary/10 hover:text-primary rounded-full transition-all" href="#">
            <Package className="size-5" />
            <span className="font-medium hidden lg:block">Inventory</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:bg-primary/10 hover:text-primary rounded-full transition-all" href="#">
            <Settings className="size-5" />
            <span className="font-medium hidden lg:block">Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-slate-50/50">
        {/* Header */}
        <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200/60">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-primary/20 text-sm"
                placeholder="Search analytics, reports..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold">
              <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
              AI LIVE
            </div>
            <button className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-600 hover:border-primary hover:text-primary transition-all">
              <Bell className="size-5" />
            </button>
            <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
              <Sparkles className="size-4" />
              Generate Report
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <section>
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 font-medium">Real-time AI-driven business intelligence.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric Card 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Total Sales</p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-5xl font-black text-slate-900">$1.2M</h2>
                  <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                    <TrendingUp className="size-4" /> +12.5%
                  </span>
                </div>
              </div>
              {/* Metric Card 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Active Users</p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-5xl font-black text-slate-900">45k</h2>
                  <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                    <TrendingUp className="size-4" /> +5.2%
                  </span>
                </div>
              </div>
              {/* Metric Card 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Latency (AI)</p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-5xl font-black text-slate-900">1.2s</h2>
                  <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                    <TrendingUp className="size-4" /> -150ms
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* AI Forecast Section */}
          <div className="bg-primary p-8 rounded-xl text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <Sparkles className="size-24 absolute -top-4 -right-4 opacity-10" />
            <div className="relative z-10 max-w-xl">
              <h3 className="text-xl font-bold mb-2">AI Forecasting</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Our model predicts a <span className="text-white font-black underline decoration-2">14% revenue surge</span> in the upcoming quarter based on current trending patterns in the premium apparel sector.
              </p>
            </div>
            <button className="whitespace-nowrap px-8 py-3 bg-white text-primary rounded-full text-sm font-black hover:bg-slate-50 transition-all">
              View Detailed Forecast
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
