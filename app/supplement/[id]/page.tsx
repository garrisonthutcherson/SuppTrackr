import { Suspense } from 'react';
import SupplementClient from './SupplementClient';

export default async function SupplementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>}>
      <SupplementClient id={id} />
    </Suspense>
  );
}
