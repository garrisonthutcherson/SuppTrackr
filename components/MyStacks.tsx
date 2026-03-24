'use client';

import { Moon, Heart, Plus, Edit2, Calendar, Pill, Brain, Droplet, Leaf, Apple, Zap, FlaskConical, Package, ShieldCheck, BarChart2 } from 'lucide-react';
import Image from 'next/image';

export default function MyStacks() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-4">
            My Stacks
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Curated biological protocols designed for high-performance physiology and cognitive optimization.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2.5 rounded-full border border-white/5">
          <span className="h-2.5 w-2.5 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(0,225,172,0.6)]"></span>
          <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">System Status: Optimized</span>
        </div>
      </section>

      {/* Stacks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Sleep Stack Card */}
        <div className="relative bg-[#15151a] rounded-3xl p-6 border border-white/5 overflow-hidden flex flex-col">
          {/* Glowing left border */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d946ef] to-[#8b5cf6] shadow-[0_0_20px_rgba(217,70,239,0.5)]"></div>
          
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <Moon className="w-6 h-6 text-white" fill="currentColor" />
              <h3 className="font-headline text-2xl font-bold text-white">Sleep Stack</h3>
            </div>
            <div className="px-3 py-1 rounded-full border border-[#d946ef]/30 bg-[#d946ef]/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Active Today</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm mb-8">Deep Sleep & Relaxation protocol</p>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 flex-1">
            {/* Supplement 1 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Melatonin</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">3MG • NIGHT</p>
              </div>
            </div>
            {/* Supplement 2 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Valerian Root</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">450MG • EVENING</p>
              </div>
            </div>
            {/* Supplement 3 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Droplet className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Magnesium</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">400MG • NIGHT</p>
              </div>
            </div>
            {/* Supplement 4 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">GABA</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">750MG • PM</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-slate-700 border border-[#15151a] overflow-hidden">
                  <Image src="https://picsum.photos/seed/user1/100/100" alt="User" width={24} height={24} className="object-cover" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#8b5cf6] border border-[#15151a] flex items-center justify-center z-10">
                  <span className="text-[9px] font-bold text-white">+2</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Edit</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Schedule</span>
              </button>
            </div>
            <button className="bg-[#2a1b38] hover:bg-[#3b264f] text-[#e8b5ff] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
              Check Conflicts
            </button>
          </div>
        </div>

        {/* General Health Stack Card */}
        <div className="relative bg-[#15151a] rounded-3xl p-6 border border-white/5 overflow-hidden flex flex-col">
          {/* Glowing left border */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00e1ac] to-[#00a3ff] shadow-[0_0_20px_rgba(0,225,172,0.5)]"></div>
          
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-[#00e1ac]" fill="currentColor" />
              <h3 className="font-headline text-2xl font-bold text-white">General Health Stack</h3>
            </div>
            <div className="px-3 py-1 rounded-full border border-[#00e1ac]/30 bg-[#00e1ac]/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00e1ac]">Optimized</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm mb-8">Daily Vitality & Longevity foundation</p>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 flex-1">
            {/* Supplement 1 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Apple className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Multivitamin</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">1 CAPSULE • MORNING</p>
              </div>
            </div>
            {/* Supplement 2 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">CoQ10</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">100MG • BREAKFAST</p>
              </div>
            </div>
            {/* Supplement 3 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Resveratrol</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">500MG • MORNING</p>
              </div>
            </div>
            {/* Supplement 4 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Iodine</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">150MCG • DAILY</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-slate-700 border border-[#15151a] overflow-hidden">
                  <Image src="https://picsum.photos/seed/user2/100/100" alt="User" width={24} height={24} className="object-cover" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#00e1ac] border border-[#15151a] flex items-center justify-center z-10">
                  <span className="text-[9px] font-bold text-[#15151a]">+5</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Edit</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Schedule</span>
              </button>
            </div>
            <button className="bg-[#102a24] hover:bg-[#1a4238] text-[#00e1ac] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
              Check Conflicts
            </button>
          </div>
        </div>

        {/* Create New Stack Card */}
        <button className="relative bg-transparent rounded-3xl p-8 border-2 border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex flex-col items-center justify-center text-center min-h-[400px] group">
          <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center mb-6 transition-colors">
            <Plus className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="font-headline text-2xl font-bold text-white mb-3">Create New Stack</h3>
          <p className="text-slate-400 text-sm max-w-[250px] leading-relaxed">
            Define a new biological protocol tailored to your specific performance markers.
          </p>
        </button>

      </div>

      {/* Bottom Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Total Supplements */}
        <div className="bg-[#15151a] rounded-2xl p-6 border border-white/5 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6 text-[#d946ef]" />
          </div>
          <div>
            <p className="text-3xl font-headline font-bold text-white leading-none mb-1">12</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Supplements</p>
          </div>
        </div>

        {/* Interaction Safety */}
        <div className="bg-[#15151a] rounded-2xl p-6 border border-white/5 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#00e1ac]/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#00e1ac]" />
          </div>
          <div>
            <p className="text-3xl font-headline font-bold text-white leading-none mb-1">100%</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Interaction Safety</p>
          </div>
        </div>

        {/* Biological Efficiency */}
        <div className="bg-[#15151a] rounded-2xl p-6 border border-white/5 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#00a3ff]/20 flex items-center justify-center shrink-0">
            <BarChart2 className="w-6 h-6 text-[#00a3ff]" />
          </div>
          <div>
            <p className="text-3xl font-headline font-bold text-white leading-none mb-1">8.4/10</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Biological Efficiency</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile/Tablet) */}
      <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] rounded-full shadow-[0_0_20px_rgba(217,70,239,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40">
        <Plus className="w-6 h-6 text-white" />
      </button>

    </div>
  );
}
