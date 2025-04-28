import { NextRequest } from 'next/server';
import { ProcessWebhook } from '@/utils/paddle/process-webhook';
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance';

import { useEffect, useState } from "react";
import { PricingTier }  from "@/components/landing/pricing/pricing-cardss"
import { Paddle, PricePreviewParams, PricePreviewResponse } from '@paddle/paddle-js';

const webhookProcessor = new ProcessWebhook();

export async function POST(request: NextRequest) {
  const signature = request.headers.get('paddle-signature') || '';
  const rawRequestBody = await request.text();
  const privateKey = process.env['PADDLE_NOTIFICATION_WEBHOOK_SECRET'] || '';

  try {
    if (!signature || !rawRequestBody) {
      return Response.json({ error: 'Missing signature from header' }, { status: 400 });
    }

    const paddle = getPaddleInstance();
    const eventData = await paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
    const eventName = eventData?.eventType ?? 'Unknown event';

    if (eventData) {
      await webhookProcessor.processEvent(eventData);
    }

    return Response.json({ status: 200, eventName });
  } catch (e) {
    console.log(e);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
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

export function usePaddlePrices( paddle: Paddle | undefined, country: string,): { prices: PaddlePrices; loading: boolean } {
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
