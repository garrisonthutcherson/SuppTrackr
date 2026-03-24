'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Search, Bell, User, TrendingDown, Pill, Droplet, Zap, AlertTriangle, CheckCircle2, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function DashboardContent({ user }: { user: FirebaseUser | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  // State to track the currently active tab in the navigation
  const [activeTab, setActiveTab] = useState(tabParam || 'dashboard');
  
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Debounce the search input to avoid spamming the NIH API
    // We wait 500ms after the user stops typing before making the request
    const delayDebounceFn = setTimeout(async () => {
      // Only search if we have at least 3 characters
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        setShowResults(true);
        try {
          const res = await fetch(`/api/search-supplements?q=${encodeURIComponent(searchQuery)}`);
          if (res.ok) {
            const data = await res.json();
            // The DSLD v8 API returns results in a 'hits' array.
            // TODO: Add pagination if hits exceed 50
            setSearchResults(data.hits || []);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        // Clear results if the search query is too short
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    // Cleanup function: clears the timeout if the user types again before 500ms
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  /**
   * Handles user sign out by calling the Firebase auth.signOut() method.
   * This will trigger the onAuthStateChanged listener in page.tsx
   * and redirect the user back to the LoginScreen.
   */
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-64 relative pb-24 md:pb-0">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-background/60 backdrop-blur-xl flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex-1 max-w-md hidden md:block relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchQuery.length > 2) setShowResults(true); }}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                placeholder="Search supplements, biomarkers..." 
                className="w-full bg-surface-container-highest border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-500 text-on-surface outline-none"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-sm text-slate-400">Searching NIH Database...</div>
                ) : searchResults.length > 0 ? (
                  <ul className="divide-y divide-white/5">
                    {searchResults.map((item, idx) => {
                      const source = item._source || {};
                      return (
                        <li 
                          key={idx} 
                          className="p-3 hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-3"
                          onMouseDown={() => {
                            router.push(`/supplement/${item._id}`);
                          }}
                        >
                          <div className="w-10 h-10 bg-white/5 rounded overflow-hidden relative shrink-0">
                            <img 
                              src={`https://api.ods.od.nih.gov/dsld/s3/pdf/thumbnails/${item._id}.jpg`}
                              alt={source.productName || 'Product'}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/supplement/100/100';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-on-surface truncate">{source.productName || 'Unknown Product'}</p>
                            <p className="text-xs text-slate-400 truncate">{source.brand || 'Generic'}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-sm text-slate-400">No supplements found.</div>
                )}
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <h1 className="font-headline font-black text-primary text-xl tracking-tighter">SuppTracker</h1>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button className="text-slate-400 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/20">
                <Image 
                  src={user?.photoURL || "https://picsum.photos/seed/user/100/100"} 
                  alt="User profile" 
                  width={32} 
                  height={32} 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button onClick={handleLogout} className="text-slate-400 hover:text-error transition-colors" title="Sign Out">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-12">
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-label text-primary font-bold tracking-[0.2em] uppercase text-xs mb-2">Neural Status: Optimized</p>
              <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface">
                Hello, {user?.displayName ? user.displayName.split(' ')[0] : 'User'}
              </h2>
            </div>
            <div className="flex gap-3">
              <div className="bg-tertiary-container/20 px-4 py-2 rounded-full border border-tertiary/20 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-tertiary animate-pulse"></span>
                <span className="text-tertiary text-xs font-bold uppercase tracking-widest">98% Consistency</span>
              </div>
            </div>
          </section>

          {/* Top Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bioavailability Widget */}
            <div className="lg:col-span-8 glass-card rounded-lg p-8 relative overflow-hidden group border border-outline-variant/10">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                    <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="351.8" strokeDashoffset="88" className="text-tertiary drop-shadow-[0_0_10px_rgba(0,225,172,0.5)]" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black font-headline tracking-tighter">12:45</span>
                    <span className="text-[10px] font-label text-slate-400 uppercase tracking-widest">PM</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-headline text-2xl font-bold mb-3">Optimal Absorption Window</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
                    It&apos;s time for your <span className="text-primary font-bold">Vitamin D3</span>. 
                    Take with your current meal for <span className="text-tertiary font-bold">32% better absorption</span>.
                  </p>
                  <button className="mt-6 bg-white text-background font-bold px-8 py-3 rounded-full text-sm hover:scale-105 transition-transform active:scale-95">
                    Log Intake
                  </button>
                </div>
              </div>
            </div>

            {/* Price Alerts */}
            <div className="lg:col-span-4 bg-surface-container-low rounded-lg p-6 border-l-2 border-primary shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <TrendingDown className="text-primary w-6 h-6" />
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase">Smart Alert</span>
                </div>
                <h4 className="font-headline text-xl font-bold mb-2">Price Optimization</h4>
                <p className="text-sm text-on-surface-variant mb-4">Your recurring <span className="font-bold text-white">Magnesium Glycinate</span> is 15% cheaper at a nearby retailer.</p>
              </div>
              <div className="bg-background/50 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-label uppercase text-slate-500">Current Cost</p>
                  <p className="text-lg font-bold">$24.99</p>
                </div>
                <TrendingDown className="text-tertiary w-5 h-5" />
                <div className="text-right">
                  <p className="text-[10px] font-label uppercase text-slate-500">Target Cost</p>
                  <p className="text-lg font-bold text-tertiary">$19.50</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Stack */}
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-headline text-2xl font-bold">Current Stack</h3>
              <button className="text-xs font-label text-primary hover:underline uppercase tracking-widest">Manage All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container-low p-6 rounded-lg group hover:bg-surface-container transition-colors relative border-l-2 border-primary">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Pill className="text-primary w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest bg-tertiary/10 px-2 py-1 rounded">Active</span>
                </div>
                <h4 className="font-headline text-lg font-bold mb-1">Magnesium Threonate</h4>
                <p className="text-xs text-on-surface-variant mb-4">400mg • Pre-sleep</p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[85%]"></div>
                </div>
                <p className="text-[10px] mt-2 text-slate-500 uppercase tracking-widest">Supply: 12 Days remaining</p>
              </div>

              <div className="bg-surface-container-low p-6 rounded-lg group hover:bg-surface-container transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Droplet className="text-slate-400 w-6 h-6" />
                  </div>
                </div>
                <h4 className="font-headline text-lg font-bold mb-1">Omega-3 EPA/DHA</h4>
                <p className="text-xs text-on-surface-variant mb-4">2000mg • With Breakfast</p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-500 h-full w-[40%]"></div>
                </div>
                <p className="text-[10px] mt-2 text-slate-500 uppercase tracking-widest">Supply: 34 Days remaining</p>
              </div>

              <div className="bg-surface-container-low p-6 rounded-lg group hover:bg-surface-container transition-colors border-l-2 border-primary glass-card">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="text-primary w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest bg-tertiary/10 px-2 py-1 rounded">Active Now</span>
                </div>
                <h4 className="font-headline text-lg font-bold mb-1">Creatine Monohydrate</h4>
                <p className="text-xs text-on-surface-variant mb-4">5g • Post-Workout</p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[100%]"></div>
                </div>
                <p className="text-[10px] mt-2 text-slate-500 uppercase tracking-widest">Supply: Full</p>
              </div>
              
              <div className="bg-surface-container-low p-6 rounded-lg group hover:bg-surface-container transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Pill className="text-slate-400 w-6 h-6" />
                  </div>
                </div>
                <h4 className="font-headline text-lg font-bold mb-1">Ashwagandha KSM-66</h4>
                <p className="text-xs text-on-surface-variant mb-4">600mg • Evening</p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-500 h-full w-[65%]"></div>
                </div>
                <p className="text-[10px] mt-2 text-slate-500 uppercase tracking-widest">Supply: 18 Days remaining</p>
              </div>
            </div>
          </section>

          {/* Bio-Conflict & Discovery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Conflict Checker */}
            <div className="bg-surface-container-low rounded-lg overflow-hidden flex flex-col border border-outline-variant/10">
              <div className="p-6 border-b border-white/5 bg-background/20 flex items-center gap-3">
                <AlertTriangle className="text-error w-6 h-6" />
                <h3 className="font-headline text-xl font-bold">Bio-Conflict Analysis</h3>
              </div>
              <div className="p-8 flex-1 space-y-6">
                <div className="flex gap-4 items-start bg-error-container/10 p-4 rounded-xl border border-error/10">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-error/20 flex items-center justify-center text-error">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-error">Timing Interaction Detected</h4>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      Iron and Calcium are both in your morning routine. For maximum absorption, separate these by at least <span className="text-white font-bold">2 hours</span>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start bg-tertiary-container/10 p-4 rounded-xl border border-tertiary/10">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-tertiary">Synergy Verified</h4>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      Vitamin D3 + K2 synergy is optimal in your current stack.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Discovery */}
            <div className="glass-card rounded-lg p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 border border-outline-variant/10">
              <div className="w-full md:w-1/3 rounded-xl overflow-hidden aspect-square border border-white/10 relative">
                <Image 
                  src="https://picsum.photos/seed/supp/400/400" 
                  alt="Supplement" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-2">
                  <span className="text-[10px] font-label text-primary font-bold uppercase tracking-[0.2em]">Neural Recommendation</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Lion&apos;s Mane Extract</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Pairs exceptionally well with your <span className="text-white font-bold">Creatine</span> intake for enhanced cognitive focus and neuroprotection during high-output sessions.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest">Focus +12%</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest">Non-Stim</span>
                </div>
                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface font-bold py-3 rounded-full text-xs uppercase tracking-widest transition-all">
                  View Research Papers
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default function Dashboard({ user }: { user: FirebaseUser | null }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <DashboardContent user={user} />
    </Suspense>
  );
}
