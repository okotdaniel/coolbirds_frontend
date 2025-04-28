import { BillingFrequency } from '@/components/landing/pricing/helpers'
import { BillingFrequencyProps } from '@/components/landing/pricing/pricing-cards'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  frequency: BillingFrequencyProps;
  setFrequency: (frequency: BillingFrequencyProps) => void;
}

export function Toggle({ setFrequency, frequency }: Props) {
  return (
    <div className="flex justify-center mb-8">
      <Tabs
        value={frequency.value}
        onValueChange={(value) =>
          setFrequency(BillingFrequency.find((billingFrequency) => value === billingFrequency.value)!)
        }
      >
        <TabsList>
          {BillingFrequency.map((billingFrequency) => (
            <TabsTrigger key={billingFrequency.value} value={billingFrequency.value}>
              {billingFrequency.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
