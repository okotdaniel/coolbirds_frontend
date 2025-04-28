'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { SubscriptionDetail } from '@/components/dashboard/subscriptions/subscription-detail';
import Spinner from '@/components/common/spinner/spinner';

export default function SubscriptionPage() {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  return (
    <main className="p-4 lg:gap-6 lg:p-8">
      <Suspense fallback={<Spinner />}>
        <SubscriptionDetail subscriptionId={subscriptionId} />
      </Suspense>
    </main>
  );
}
