'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ChevronRight, Star, CheckCircle2, Zap, Brain, Activity, PlusCircle, ShoppingCart, Calendar, AlertTriangle, ArrowRight, FlaskConical, XCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { auth } from '@/lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export default function SupplementClient({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState('supplements');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [supplement, setSupplement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch the detailed supplement data from our API route
    // The API route will handle the actual call to the NIH DSLD database
    async function fetchSupplement() {
      try {
        const res = await fetch(`/api/supplement/${id}`);
        if (res.ok) {
          const data = await res.json();
          setSupplement(data);
        }
      } catch (error) {
        console.error('Error fetching supplement:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSupplement();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background text-on-surface">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
        <main className={`flex-1 relative transition-all duration-300 flex items-center justify-center ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
          <div className="animate-pulse text-primary">Loading supplement data...</div>
        </main>
      </div>
    );
  }

  if (!supplement) {
    return (
      <div className="flex min-h-screen bg-background text-on-surface">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
        <main className={`flex-1 relative transition-all duration-300 flex items-center justify-center ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
          <div className="text-error">Supplement not found.</div>
        </main>
      </div>
    );
  }

  // Extract data from DSLD response
  const productName = supplement.productName || 'Unknown Product';
  const brand = supplement.brand || 'Unknown Brand';
  const category = supplement.langualProductType?.split(',')[0] || 'Supplement';
  
  // Try to get serving size info
  let servingSize = 'Unknown';
  let servingsPerContainer = 'Unknown';
  if (supplement.dietarySupplementsFacts && supplement.dietarySupplementsFacts.length > 0) {
    const facts = supplement.dietarySupplementsFacts[0];
    if (facts.servingSizeQuantity && facts.servingSizeUnitName) {
      servingSize = `${facts.servingSizeQuantity} ${facts.servingSizeUnitName}`;
    }
    if (facts.servingsPerContainer) {
      servingsPerContainer = facts.servingsPerContainer;
    }
  }

  // Extract ingredients
  const ingredients: any[] = [];
  let otherIngredients = 'None listed.';
  if (supplement.dietarySupplementsFacts) {
    supplement.dietarySupplementsFacts.forEach((fact: any) => {
      if (fact.ingredients) {
        fact.ingredients.forEach((ing: any) => {
          if (ing.data) {
            ingredients.push({
              ingredientName: ing.name,
              ingredientQuantity: ing.data.sfbQuantityQuantity ? `${ing.data.sfbQuantityQuantity} ${ing.data.unitName || ''}`.trim() : '-',
              dvPercent: ing.dvPercent || '-'
            });
          }
        });
      }
      if (fact.otheringredients && fact.otheringredients.text) {
        otherIngredients = fact.otheringredients.text;
      }
    });
  }

  const suggestedUse = supplement.suggestedUse || 'Consume as directed by a healthcare professional.';
  
  // Extract statements for description
  let description = 'Elevate your cognitive threshold with the gold standard of choline donors. High-purity L-alpha-glycerylphosphorylcholine engineered for rapid neural synthesis.';
  if (supplement.statementGroups) {
    const otherGroup = supplement.statementGroups.find((g: any) => g.groupName === 'Other');
    if (otherGroup && otherGroup.statements && otherGroup.statements.length > 0) {
      description = otherGroup.statements.join(' ');
    }
  }

  // Extract warnings
  let warnings: string[] = [];
  if (supplement.statementGroups) {
    const precautionsGroup = supplement.statementGroups.find((g: any) => g.groupName === 'Precautions');
    if (precautionsGroup && precautionsGroup.statements && precautionsGroup.statements.length > 0) {
      warnings = precautionsGroup.statements;
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      <main className={`flex-1 relative pb-24 md:pb-0 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto space-y-12">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-label uppercase tracking-widest text-slate-500">
            <span>MARKETPLACE</span>
            <ChevronRight className="w-3 h-3" />
            <span>{category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-on-surface font-bold">{productName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Image & Badges */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-low rounded-[32px] aspect-square flex items-center justify-center p-8 relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                {/* Image from DSLD API */}
                <div className="relative w-full h-full drop-shadow-2xl">
                  <Image 
                    src={`https://api.ods.od.nih.gov/dsld/s3/pdf/thumbnails/${id}.jpg`}
                    alt={productName} 
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/supplement-bottle/400/400';
                    }}
                  />
                </div>
                
                {/* Image pagination dots (mock) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-tertiary/30 bg-tertiary/10 text-tertiary">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold">Third Party Tested</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold">Bio-Available</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-surface-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    {brand}
                  </span>
                  <div className="flex items-center gap-1 text-tertiary text-sm font-bold">
                    <Star className="w-4 h-4 fill-tertiary" />
                    <span>4.9 (1,240 Reviews)</span>
                  </div>
                </div>
                <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter mb-4">
                  {productName}
                </h1>
                <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl">
                  {description}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Brain className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Psychology</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">Focus & Clarity</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Directly supports acetylcholine production for sharp mental edge.
                  </p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-tertiary mb-2">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Memory</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">Recall Speed</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Optimizes synapse firing rates for faster information retrieval.
                  </p>
                </div>
              </div>

              {/* Analytics Card */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Activity className="w-5 h-5" />
                  <span className="font-headline text-xl font-bold text-on-surface">Clinical Efficacy</span>
                </div>
                <div className="mb-2 flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Cognitive Score Increase</span>
                  <span className="text-sm font-bold">+24%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-4">
                  <div className="bg-primary h-full w-[85%] rounded-full"></div>
                </div>
                <p className="text-xs text-slate-500 italic">
                  *Based on a 12-week double-blind, placebo-controlled study with 300mg daily dosage in healthy adults (n=450).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform active:scale-95">
                  <PlusCircle className="w-5 h-5" />
                  Add to My Stack
                </button>
                <button className="flex items-center gap-2 bg-surface-container-high border border-white/10 text-on-surface px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Buy on Amazon
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
            
            {/* Supplement Facts */}
            <div className="bg-surface-container-low p-8 rounded-[32px] border border-white/5 lg:col-span-1">
              <h3 className="font-headline text-2xl font-bold mb-6">Supplement Facts</h3>
              
              <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
                <span className="text-slate-400">Serving Size</span>
                <span className="font-bold">{servingSize}</span>
              </div>
              <div className="flex justify-between border-b-4 border-white/10 pb-4 mb-6">
                <span className="text-slate-400">Servings Per Container</span>
                <span className="font-bold">{servingsPerContainer}</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-4">
                <span className="font-bold text-lg">Amount Per Serving</span>
                <span className="text-xs font-bold text-slate-400">% DV</span>
              </div>

              <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <p className="font-bold">{ing.ingredientName || 'Ingredient'}</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="font-bold">{ing.ingredientQuantity || '-'}</span>
                      <span className="text-slate-500 text-sm w-10 text-right">
                        {ing.dvPercent !== '-' ? `${ing.dvPercent}%` : '*'}
                      </span>
                    </div>
                  </div>
                ))}
                {ingredients.length === 0 && (
                  <div className="text-slate-500 text-sm">No ingredient data available.</div>
                )}
              </div>

              <div className="text-xs text-slate-500 space-y-2">
                <p>* Daily Value (DV) not established.</p>
                <p>Other ingredients: {otherIngredients}</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6 lg:col-span-1">
              {/* Protocol */}
              <div className="bg-surface-container-low p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-primary/10">
                  <Calendar className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <Calendar className="w-5 h-5" />
                    <span className="font-headline text-xl font-bold text-on-surface">Suggested Protocol</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {suggestedUse}
                  </p>
                  <div className="flex items-center gap-3 bg-background/50 p-3 rounded-full border border-white/5 w-max">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700 border border-background z-20"></div>
                      <div className="w-6 h-6 rounded-full bg-slate-600 border border-background z-10"></div>
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-background border border-background z-0">+12</div>
                    </div>
                    <span className="text-xs font-bold text-primary">Verified by Health Coaches</span>
                  </div>
                </div>
              </div>

              {/* Purity Guarantee */}
              <div className="bg-surface-container-low p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
                <div className="absolute -bottom-4 -left-4 text-tertiary/10">
                  <FlaskConical className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-headline text-xl font-bold mb-4">Molecular Purity Guarantee</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Every batch undergoes rigorous HPLC and ICP-MS testing to ensure a minimum purity of 99.2% and absence of heavy metal contaminants.
                  </p>
                  <button className="bg-surface-container-high border border-white/10 text-xs font-bold px-6 py-3 rounded-full hover:bg-white/5 transition-colors">
                    VIEW LAB REPORT
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Warnings */}
            <div className="bg-surface-container-low p-8 rounded-[32px] border border-white/5 relative overflow-hidden lg:col-span-1">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] font-headline font-black text-8xl pointer-events-none">
                WARNING
              </div>
              <div className="relative z-10">
                <h3 className="font-headline text-2xl font-bold mb-8">Conflict Warnings</h3>
                
                <div className="space-y-6">
                  {warnings.length > 0 ? warnings.map((warning, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-300">{warning}</p>
                    </div>
                  )) : (
                    <div className="flex gap-4 items-start">
                      <CheckCircle2 className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-300">No specific conflict warnings found on label.</p>
                    </div>
                  )}
                </div>

                <div className="mt-12 pt-6 border-t border-white/10">
                  <button className="flex items-center justify-between w-full group">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Full Interaction Analysis</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
