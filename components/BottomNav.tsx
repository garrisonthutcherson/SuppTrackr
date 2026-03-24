'use client';
import { Activity, Layers, AlertTriangle, Compass, ShoppingCart } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function BottomNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Home' },
    { id: 'stack', icon: Layers, label: 'Stack' },
    { id: 'conflicts', icon: AlertTriangle, label: 'Alerts' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'market', icon: ShoppingCart, label: 'Market' },
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-50 rounded-t-[2rem] pb-safe">
      {navItems.map((item) => {
        const isActive = activeTab === item.id && pathname === '/';
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-col items-center justify-center p-2 transition-all ${
              isActive ? 'text-primary' : 'text-slate-400 hover:text-white/80'
            }`}
          >
            <div className={`${isActive ? 'bg-primary-container/20 p-2 rounded-2xl shadow-[inset_0_0_10px_rgba(249,171,255,0.1)]' : ''}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-label uppercase mt-1 tracking-widest">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
