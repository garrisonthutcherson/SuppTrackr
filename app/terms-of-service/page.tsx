import { TermsOfServiceContent } from '@/components/TermsOfServiceContent';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-label tracking-widest uppercase text-xs font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="glass-panel p-8 md:p-12 rounded-2xl border border-outline-variant/20 shadow-2xl bg-surface/50 backdrop-blur-xl">
          <TermsOfServiceContent />
        </div>
      </div>
    </div>
  );
}
