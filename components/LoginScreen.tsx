'use client';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Activity, HelpCircle, Globe, AlertCircle, X } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, microsoftProvider, twitterProvider, storage } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { TermsOfServiceContent } from './TermsOfServiceContent';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

/**
 * LoginScreen Component
 * 
 * Handles user authentication via Single Sign-On (SSO) providers like Google, 
 * Microsoft, and X (Twitter). It also displays the Terms of Service and 
 * Privacy Policy in modal overlays.
 */
export default function LoginScreen() {
  // State to manage authentication errors
  const [error, setError] = useState<string | null>(null);
  
  // State to manage loading status during authentication
  const [isLoading, setIsLoading] = useState(false);
  
  // State to store background image URLs fetched from Firebase Storage
  const [desktopBg, setDesktopBg] = useState<string | null>(null);
  const [mobileBg, setMobileBg] = useState<string | null>(null);
  
  // State to manage the visibility of legal modals
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  /**
   * Effect: Fetch Background Images
   * Retrieves the URLs for the desktop and mobile background images
   * from Firebase Storage when the component mounts.
   */
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const dUrl = await getDownloadURL(ref(storage, 'assets/supptrackr-desktop-bg.png'));
        const mUrl = await getDownloadURL(ref(storage, 'assets/supptrackr-mobile-bg.png'));
        setDesktopBg(dUrl);
        setMobileBg(mUrl);
      } catch (error) {
        console.error("Error fetching background images:", error);
      }
    };
    fetchImages();
  }, []);

  /**
   * Handles the login process using Firebase Authentication popup.
   * 
   * @param provider - The Firebase Auth provider instance (e.g., googleProvider)
   * @param providerName - A string representing the provider name for error logging
   */
  const handleLogin = async (provider: any, providerName: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // Trigger the Firebase popup authentication flow
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(`${providerName} login error:`, err);
      // Display a user-friendly error message if login fails
      setError(err.message || `Failed to sign in with ${providerName}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {desktopBg && (
          <Image
            src={desktopBg}
            alt="Biological background desktop"
            fill
            className="object-cover opacity-20 mix-blend-screen hidden md:block"
            referrerPolicy="no-referrer"
          />
        )}
        {mobileBg && (
          <Image
            src={mobileBg}
            alt="Biological background mobile"
            fill
            className="object-cover opacity-20 mix-blend-screen block md:hidden"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 to-background"></div>
      </div>

      {/* Brand Anchor Top */}
      <header className="absolute top-6 md:top-12 left-0 w-full px-8 z-10 flex flex-col items-center">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] rounded-3xl py-4 px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-primary w-8 h-8" />
            <h1 className="font-headline font-black tracking-tighter text-3xl text-on-surface">SuppTracker</h1>
          </div>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant opacity-70 text-center">Supplement Tracking Made Easy</p>
        </div>
      </header>

      {/* Login Container */}
      <section className="relative z-10 w-full max-w-sm mt-20 md:mt-0">
        {/* Glassmorphic Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel p-8 rounded-lg shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-outline-variant/20"
        >
          <div className="mb-10 text-center">
            <h2 className="font-headline font-bold text-2xl mb-2 text-on-surface">Login Below</h2>
          </div>

          {/* SSO Buttons Cluster */}
          <div className="space-y-4">
            {error && (
              <div className="bg-error/10 border border-error/20 text-error text-xs p-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {/* Google */}
            <button 
              onClick={() => handleLogin(googleProvider, 'Google')} 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all py-4 px-6 rounded-full group border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.16-1.94 4.18-1.12 1.12-2.8 2.34-5.9 2.34-5.04 0-9.2-4.1-9.2-9.14s4.16-9.14 9.2-9.14c2.68 0 4.64 1.04 6.08 2.42l2.3-2.3c-2.08-1.94-4.78-3.08-8.38-3.08-6.62 0-12 5.38-12 12s5.38 12 12 12c3.58 0 6.28-1.18 8.38-3.32 2.14-2.14 2.82-5.16 2.82-7.58 0-.54-.04-1.06-.12-1.54h-11.08z" fill="#EA4335"></path>
              </svg>
              <span className="font-label text-sm font-semibold tracking-wide text-on-surface">Continue with Google</span>
            </button>
            {/* Microsoft */}
            <button 
              onClick={() => handleLogin(microsoftProvider, 'Microsoft')} 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all py-4 px-6 rounded-full group border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 23 23">
                <path d="M1 1h10v10H1z" fill="#f35325"></path><path d="M12 1h10v10H12z" fill="#81bc06"></path><path d="M1 12h10v10H1z" fill="#05a6f0"></path><path d="M12 12h10v10H12z" fill="#ffba08"></path>
              </svg>
              <span className="font-label text-sm font-semibold tracking-wide text-on-surface">Continue with Microsoft</span>
            </button>
            {/* X */}
            <button 
              onClick={() => handleLogin(twitterProvider, 'X')} 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all py-4 px-6 rounded-full group border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 fill-on-surface group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              <span className="font-label text-sm font-semibold tracking-wide text-on-surface">Continue with X</span>
            </button>
          </div>

          {/* Footer Links inside Card */}
          <div className="mt-8 pt-8 border-t border-outline-variant/20 flex flex-col items-center gap-4">
            <p className="text-[10px] text-on-surface-variant text-center leading-relaxed px-4">
              By continuing, you agree to SuppTracker&apos;s <button onClick={() => setIsTermsModalOpen(true)} className="underline hover:text-on-surface">Terms of Service</button> and <button onClick={() => setIsPrivacyModalOpen(true)} className="underline hover:text-on-surface">Privacy Policy</button>.
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Accent Element */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-tertiary/10 rounded-full blur-[50px] pointer-events-none"></div>
      </section>

      {/* Bottom Assistance */}
      <footer className="absolute bottom-12 z-10 flex gap-8">
        <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <HelpCircle className="w-4 h-4" />
          <span className="text-xs font-label font-medium uppercase tracking-widest">Support</span>
        </div>
        <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <Globe className="w-4 h-4" />
          <span className="text-xs font-label font-medium uppercase tracking-widest">EN-US</span>
        </div>
      </footer>
      {/* Terms of Service Modal */}
      <AnimatePresence>
        {isTermsModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-surface border border-outline-variant/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-outline-variant/20 bg-surface/80 backdrop-blur-md sticky top-0 z-10">
                <h2 className="font-headline font-bold text-xl text-on-surface">Terms of Service</h2>
                <button 
                  onClick={() => setIsTermsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-on-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <TermsOfServiceContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-surface border border-outline-variant/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-outline-variant/20 bg-surface/80 backdrop-blur-md sticky top-0 z-10">
                <h2 className="font-headline font-bold text-xl text-on-surface">Privacy Policy</h2>
                <button 
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-on-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <PrivacyPolicyContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
