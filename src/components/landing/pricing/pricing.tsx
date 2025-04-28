
import { useEffect, useState } from 'react';
import  {BillingFrequency}  from '@/components/landing/pricing/helpers'
import { BillingFrequencyProps } from '@/components/landing/pricing/pricing-cards'
import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { usePaddlePrices } from '@/components/landing/pricing/helpers'

import { Toggle } from '@/components/common/toggle/toggle';
import { PricingCards } from '@/components/landing/pricing/pricing-cards'

interface Props {
  country: string;
}

export function Pricing({ country }: Props) {
  const [frequency, setFrequency] = useState<BillingFrequencyProps>(BillingFrequency[0]);
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);

  const { prices, loading } = usePaddlePrices(paddle, country);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
      }).then((paddle) => {
        if (paddle) {
          setPaddle(paddle);
        }
      });
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl relative px-[32px] flex flex-col items-center justify-between">
      <Toggle frequency={frequency} setFrequency={setFrequency} />
      <PricingCards frequency={frequency} loading={loading} priceMap={prices} />
    </div>
  );
}
