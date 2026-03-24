'use client';
import { Activity, Layers, AlertTriangle, Compass, Calendar, ShoppingCart, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'stack', icon: Layers, label: 'My Stack' },
    { id: 'conflicts', icon: AlertTriangle, label: 'Conflicts' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'schedule', icon: Calendar, label: 'Scheduling' },
    { id: 'market', icon: ShoppingCart, label: 'Marketplace' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-surface/60 backdrop-blur-xl flex-col p-6 border-r border-white/5 shadow-[40px_0_60px_rgba(0,0,0,0.2)] hidden md:flex">
      <div className="mb-10">
        <h1 className="font-headline font-black text-primary text-xl tracking-tighter flex items-center gap-2">
          <Activity className="w-5 h-5" />
          SuppTracker
        </h1>
        <p className="font-body font-medium uppercase tracking-[0.1em] text-[11px] text-slate-500 mt-1">Supplement Tracking Made Easy</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-full transition-all active:translate-x-1 ${
                isActive 
                  ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-label font-medium uppercase tracking-[0.1em] text-[11px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-white/5 space-y-2">
        <button className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold py-3 px-4 rounded-full text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity mb-4">
          Optimize Bioavailability
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-2 text-slate-400 hover:text-white transition-all text-[11px] uppercase tracking-widest">
          <Settings className="w-4 h-4" /> Settings
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-2 text-slate-400 hover:text-white transition-all text-[11px] uppercase tracking-widest">
          <HelpCircle className="w-4 h-4" /> Support
        </button>
      </div>
    </aside>
  );
}
