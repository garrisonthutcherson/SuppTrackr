'use client';

import { ArrowLeft, Bell } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface p-6 md:p-12 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter">Notifications</h1>
        </div>

        <div className="glass-panel border border-outline-variant/20 rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-10 h-10 text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">You&apos;re all caught up!</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            You don&apos;t have any new notifications at the moment. We&apos;ll let you know when there&apos;s an update on your supplements, schedule, or potential conflicts.
          </p>
        </div>
      </div>
    </div>
  );
}
