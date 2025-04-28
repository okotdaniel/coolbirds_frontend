'use client';
import { useEffect, useState } from 'react';
import { SubscriptionPastPaymentsCard } from '@/components/dashboard/subscriptions/subscription-past-payments-card';
import { SubscriptionNextPaymentCard } from '@/components/dashboard/subscriptions/subscription-next-payment-card';
import { SubscriptionLineItems } from '@/components/dashboard/subscriptions/subscription-line-items';
import { SubscriptionHeader } from '@/components/dashboard/subscriptions/subscription-header';
import { Separator } from '@/components/ui/separator';
import Spinner from '@/components/common/spinner/spinner';
import { SubscriptionDetailResponse, TransactionResponse } from '@/app/api/paddle/types'
import { getSubscription } from '@/app/api/paddle/api'; // api call
import { getTransactions } from '@/app/api/paddle/api'; // api call

// making the actual api calls for the subscription and transaction 
import { fetchTransactionRecords } from '@/lib/api/pricing/pricingApiSlice';
import { fetchSubscriptionRecords } from '@/lib/api/pricing/pricingApiSlice';

interface Props {
  subscriptionId: string;
}

export function SubscriptionDetail({ subscriptionId }: Props) {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionDetailResponse>();
  const [transactions, setTransactions] = useState<TransactionResponse>();

  useEffect(() => {
    (async () => {
      const [subscriptionResponse, transactionsResponse] = await Promise.all([
        fetchSubscriptionRecords(subscriptionId),
        fetchTransactionRecords(subscriptionId, ''),
      ]);

      if (subscriptionResponse) {
        setSubscription(subscriptionResponse);
      }

      if (transactionsResponse) {
        setTransactions(transactionsResponse);
      }
      setLoading(false);
    })();
  }, [subscriptionId]);

  if (loading) {
    return <Spinner />;
  } else if (subscription?.data && transactions?.data) {
    return (
      <>
        <div>
          <SubscriptionHeader subscription={subscription.data} />
          <Separator className={'relative bg-border mb-8 dashboard-header-highlight'} />
        </div>
        <div className={'grid gap-6 grid-cols-1 xl:grid-cols-6'}>
          <div className={'grid auto-rows-max gap-6 grid-cols-1 xl:col-span-2'}>
            <SubscriptionNextPaymentCard transactions={transactions.data} subscription={subscription.data} />
            <SubscriptionPastPaymentsCard transactions={transactions.data} subscriptionId={subscriptionId} />
          </div>
          <div className={'grid auto-rows-max gap-6 grid-cols-1 xl:col-span-4'}>
            <SubscriptionLineItems subscription={subscription.data} />
          </div>
        </div>
      </>
    );
  } else {
    return (<>Something went wrong</>);
  }
}
