'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

import pkg from '../package.json';

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [desktopBg, setDesktopBg] = useState<string | null>(null);
  const [mobileBg, setMobileBg] = useState<string | null>(null);
  const version = pkg.version;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const dUrl = await getDownloadURL(ref(storage, 'assets/supptrackr-desktop-bg.webp'));
        const mUrl = await getDownloadURL(ref(storage, 'assets/supptrackr-mobile-bg.webp'));
        setDesktopBg(dUrl);
        setMobileBg(mUrl);
      } catch (error) {
        console.error("Error fetching background images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const duration = 3000; // 3 seconds to reach 100%
    const interval = 30; // update every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Use an ease-in-out like curve for the number to match the bar's animation
      const t = currentStep / steps;
      const easeInOutQuart = t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      const newProgress = Math.min(Math.round(easeInOutQuart * 100), 100);
      
      setProgress(newProgress);
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {desktopBg && (
          <Image
            src={desktopBg}
            alt="Biological background desktop"
            fill
            priority
            sizes="(min-width: 768px) 100vw, 1px"
            className="object-cover opacity-30 mix-blend-screen hidden md:block"
            referrerPolicy="no-referrer"
          />
        )}
        {mobileBg && (
          <Image
            src={mobileBg}
            alt="Biological background mobile"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 1px"
            className="object-cover opacity-30 mix-blend-screen block md:hidden"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        {/* Ambient Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-container/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary-container/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Central Branding Card */}
      <div className="relative z-10 w-full max-w-[320px] px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card rounded-xl p-8 flex flex-col items-center shadow-[0_40px_60px_-15px_rgba(156,39,176,0.15)] border border-outline-variant/10"
        >
          {/* Minimalist Logo Icon */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 20px rgba(156,39,176,0.2)", "0 0 40px rgba(156,39,176,0.6)", "0 0 20px rgba(156,39,176,0.2)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8 p-4 bg-gradient-to-br from-primary to-primary-container rounded-lg relative"
          >
            <Activity className="w-10 h-10 text-on-primary relative z-10" />
            <div className="absolute inset-0 bg-primary opacity-50 blur-xl rounded-full"></div>
          </motion.div>

          {/* Branding Text */}
          <div className="text-center space-y-2 mb-12">
            <h1 className="font-headline font-black text-4xl tracking-tighter text-primary">
              SuppTracker
            </h1>
            <p className="font-label text-[10px] uppercase tracking-[0.3em] font-bold text-primary opacity-80">
              SUPPLEMENT TRACKING MADE EASY
            </p>
          </div>

          {/* Loading Component */}
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-label font-bold text-on-surface-variant tracking-wider uppercase opacity-60">
                {progress < 100 ? 'Initializing Scan' : 'Neural Sync Complete'}
              </span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] font-label font-bold text-primary tracking-wider tabular-nums"
              >
                {progress}%
              </motion.span>
            </div>
            {/* Loading Bar Container */}
            <div className="relative h-2 w-full bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
              {/* Progress Gradient */}
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-container via-primary to-primary-container bg-[length:200%_100%] rounded-full shadow-[0_0_15px_rgba(208,188,255,0.8)] overflow-hidden"
              >
                {/* Animated Shimmer Effect */}
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Metadata */}
      <div className="absolute bottom-12 z-10 text-center">
        <p className="text-[10px] font-label text-on-surface-variant tracking-[0.2em] font-medium opacity-40 uppercase">
          {`System Version ${version} // Neural Sync Active`}
        </p>
      </div>
    </div>
  );
}
