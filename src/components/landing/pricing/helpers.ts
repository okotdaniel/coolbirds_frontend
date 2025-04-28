import { Paddle, PricePreviewParams, PricePreviewResponse } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { PricingTier } from '@/components/landing/pricing/price-tier'
import { BillingFrequencyProps } from '@/components/landing/pricing/pricing-cards'
import { CheckoutEventsTimePeriod } from '@paddle/paddle-js';

export function parseSDKResponse<T>(response: T): T {
  return JSON.parse(JSON.stringify(response));
}

export const ErrorMessage = 'Something went wrong, please try again later';

export function getErrorMessage() {
  return { error: ErrorMessage, data: [], hasMore: false, totalRecords: 0 };
}

export function getPaymentReason(origin: string) {
  if (origin === 'web' || origin === 'subscription_charge') {
    return 'New';
  } else {
    return 'Renewal of ';
  }
}

export function convertAmountFromLowestUnit(amount: string, currency: string) {
  switch (currency) {
    case 'JPY':
    case 'KRW':
      return parseFloat(amount);
    default:
      return parseFloat(amount) / 100;
  }
}

export function parseMoney(amount: string = '0', currency: string = 'USD') {
  const parsedAmount = convertAmountFromLowestUnit(amount, currency);
  return formatMoney(parsedAmount, currency);
}

export function formatMoney(amount: number = 0, currency: string = 'USD') {
  const language = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  return new Intl.NumberFormat(language ?? 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export type PaddlePrices = Record<string, string>;

function getLineItems(): PricePreviewParams['items'] {
  const priceId = PricingTier.map((tier) => [tier.priceId.month, tier.priceId.year]);
  return priceId.flat().map((priceId) => ({ priceId, quantity: 1 }));
}

function getPriceAmounts(prices: PricePreviewResponse) {
  return prices.data.details.lineItems.reduce((acc, item) => {
    acc[item.price.id] = item.formattedTotals.total;
    return acc;
  }, {} as PaddlePrices);
}

export function usePaddlePrices(
  paddle: Paddle | undefined,
  country: string,
): { prices: PaddlePrices; loading: boolean } {
  const [prices, setPrices] = useState<PaddlePrices>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const paddlePricePreviewRequest: Partial<PricePreviewParams> = {
      items: getLineItems(),
      ...(country !== 'OTHERS' && { address: { countryCode: country } }),
    };

    setLoading(true);

    paddle?.PricePreview(paddlePricePreviewRequest as PricePreviewParams).then((prices) => {
      setPrices((prevState) => ({ ...prevState, ...getPriceAmounts(prices) }));
      setLoading(false);
    });
  }, [country, paddle]);
  return { prices, loading };
}

const BillingCycleMap = {
  day: 'daily',
  week: 'weekly',
  month: 'monthly',
  year: 'yearly',
};

const CustomBillingCycleMap = {
  day: 'days',
  week: 'weeks',
  month: 'months',
  year: 'years',
};

export function formatBillingCycle({ frequency, interval }: CheckoutEventsTimePeriod) {
  if (frequency === 1) {
    return BillingCycleMap[interval];
  } else {
    return `every ${frequency} ${CustomBillingCycleMap[interval]}`;
  }
}

export const BillingFrequency: BillingFrequencyProps[] = [
  { value: 'month', label: 'Monthly', priceSuffix: 'per user/month' },
  { value: 'year', label: 'Annual', priceSuffix: 'per user/year' },
];
