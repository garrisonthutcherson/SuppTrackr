'use client';
import { Activity, Layers, AlertTriangle, Compass, Calendar, ShoppingCart, Settings, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed 
}: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  isCollapsed: boolean,
  setIsCollapsed: (collapsed: boolean) => void
}) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'stack', icon: Layers, label: 'My Stack' },
    { id: 'conflicts', icon: AlertTriangle, label: 'Conflicts' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'schedule', icon: Calendar, label: 'Scheduling' },
    { id: 'market', icon: ShoppingCart, label: 'Marketplace' },
  ];

  const handleNavClick = (id: string) => {
    // If we're on a supplement detail page, route back to the home page with the tab as a query param
    if (pathname !== '/') {
      router.push(`/?tab=${id}`);
    } else {
      // Otherwise just switch the tab state locally
      setActiveTab(id);
    }
  };

  return (
    <aside className={`h-screen fixed left-0 top-0 z-40 bg-surface/60 backdrop-blur-xl flex-col p-4 border-r border-white/5 shadow-[40px_0_60px_rgba(0,0,0,0.2)] hidden md:flex transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="mb-10 flex items-center justify-between">
        <div className={`cursor-pointer overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'}`} onClick={() => handleNavClick('dashboard')}>
          <h1 className="font-headline font-black text-primary text-xl tracking-tighter flex items-center gap-2 whitespace-nowrap">
            <Activity className="w-5 h-5 shrink-0" />
            SuppTracker
          </h1>
          <p className="font-body font-medium uppercase tracking-[0.1em] text-[11px] text-slate-500 mt-1 whitespace-nowrap">Supplement Tracking</p>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-full hover:bg-white/5 text-slate-400 transition-all ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      <nav className="flex-1 space-y-2 overflow-hidden">
        {navItems.map((item) => {
          const isActive = activeTab === item.id && pathname === '/';
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              title={isCollapsed ? item.label : ''}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-full transition-all active:translate-x-1 relative ${
                isActive 
                  ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className={`font-label font-medium uppercase tracking-[0.1em] text-[11px] whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-white/5 space-y-2 overflow-hidden">
        {!isCollapsed && (
          <button className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold py-3 px-4 rounded-full text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity mb-4 whitespace-nowrap overflow-hidden">
            Optimize Bioavailability
          </button>
        )}
        <button 
          title={isCollapsed ? "Settings" : ""}
          className="w-full flex items-center gap-4 px-4 py-2 text-slate-400 hover:text-white transition-all text-[11px] uppercase tracking-widest"
        >
          <Settings className="w-4 h-4 shrink-0" /> 
          <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>Settings</span>
        </button>
        <button 
          title={isCollapsed ? "Support" : ""}
          className="w-full flex items-center gap-4 px-4 py-2 text-slate-400 hover:text-white transition-all text-[11px] uppercase tracking-widest"
        >
          <HelpCircle className="w-4 h-4 shrink-0" /> 
          <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>Support</span>
        </button>
      </div>
    </aside>
  );
}
