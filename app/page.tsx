'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SplashScreen from '@/components/SplashScreen';
import LoginScreen from '@/components/LoginScreen';
import Dashboard from '@/components/Dashboard';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * Home Component
 * 
 * This is the main entry point of the application. It handles the routing
 * between the splash screen, the login screen, and the main dashboard.
 * It also listens to Firebase Authentication state changes to determine
 * which screen to show the user.
 */
export default function Home() {
  // State to manage the currently displayed screen
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'login' | 'dashboard'>('splash');
  
  // State to hold the currently authenticated Firebase user
  const [user, setUser] = useState<User | null>(null);
  
  // State to track if the initial authentication check has completed
  const [isAuthReady, setIsAuthReady] = useState(false);

  /**
   * Effect: Firebase Authentication Listener
   * Subscribes to auth state changes when the component mounts.
   * Updates the `user` state and marks auth as ready.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  /**
   * Effect: Screen Transition Logic
   * Manages the transition from the splash screen to either the login
   * screen or the dashboard, depending on the user's authentication status.
   * Includes a minimum display time for the splash screen.
   */
  useEffect(() => {
    if (currentScreen === 'splash' && isAuthReady) {
      // Set a timer to ensure the splash screen is visible for at least 3.5 seconds
      const timer = setTimeout(() => {
        if (user) {
          // User is logged in, go to dashboard
          setCurrentScreen('dashboard');
        } else {
          // User is not logged in, go to login screen
          setCurrentScreen('login');
        }
      }, 3500); 
      
      // Cleanup timer on unmount or state change
      return () => clearTimeout(timer);
    }
  }, [currentScreen, isAuthReady, user]);

  return (
    <main className="flex-1 relative flex flex-col">
      {/* AnimatePresence allows components to animate out when they are removed from the React tree */}
      <AnimatePresence mode="wait">
        
        {/* Splash Screen View */}
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0 z-50"
          >
            <SplashScreen />
          </motion.div>
        )}
        
        {/* Login Screen View */}
        {currentScreen === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
            className="absolute inset-0 z-40"
          >
            <LoginScreen />
          </motion.div>
        )}
        
        {/* Main Dashboard View */}
        {currentScreen === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col min-h-screen"
          >
            <Dashboard user={user} />
          </motion.div>
        )}
        
      </AnimatePresence>
    </main>
  );
}
