import { Suspense } from 'react';
// import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';

// import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubscriptionDetail } from '@/components/dashboard/subscriptions/subscription-detail';
import {getSubscriptions}  from '@/app/api/paddle/api' // api call
import { SubscriptionCards } from '@/components/dashboard/subscriptions/subscription-cards';

export default async function SubscriptionsListPage() {
  
  const { data: subscriptions } = await getSubscriptions();

  if (subscriptions) {
    if (subscriptions.length === 0) {
      return (
        <main className="p-4 lg:gap-6 lg:p-8">
          {/* <Suspense fallback={<LoadingScreen />}> */}
            <>
              {/* <DashboardPageHeader pageTitle={'Subscriptions'} /> */}
              <div className={'grid grid-cols-12'}>
                <Card
                  className={'bg-background/50 backdrop-blur-[24px] border-border p-6 col-span-12 md:col-span-6 lg:col-span-4'}
                >
                  <CardHeader className="p-0 space-y-0">
                    <CardTitle className="flex justify-between items-center pb-2">
                      <span className={'text-xl font-medium'}> No active subscriptions </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={'p-0'}>
                    <div className="text-base leading-6 text-secondary">  Sign up for a subscription to see your subscriptions here.  </div>
                  </CardContent>
                  <CardFooter className={'p-0 pt-6'}>
                    <Button asChild={true} size={'sm'} variant={'outline'} className={'text-sm rounded-sm border-border'}>
                      <Link href={'/'}>View all</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </>
          
          {/* </Suspense> */}
        </main>
      )
      } else if (subscriptions.length === 1) {
        return (
          <SubscriptionDetail subscriptionId={subscriptions[0].id} />
        )
      } else {
        return (
          <SubscriptionCards className={'grid-cols-1 lg:grid-cols-3 gap-6'} subscriptions={subscriptions} />
        )
      }
    } else {
      return (
        <div className={'text-center'}>Something went wrong, please try again later.</div>
      )
    }
  
}

