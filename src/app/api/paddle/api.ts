
// getCustomerId

// import { createClient } from '@/utils/supabase/server';
import { CreateApi } from '@reduxjs/toolkit/query'; 
import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

import { getErrorMessage } from '@/components/landing/pricing/helpers';
import { ErrorMessage, parseSDKResponse } from '@/components/landing/pricing/helpers';

import { TransactionResponse } from '@/app/api/paddle/types';
import { SubscriptionResponse } from '@/app/api/paddle/types';
import { SubscriptionDetailResponse } from '@/app/api/paddle/types';


import { Environment, LogLevel, Paddle, PaddleOptions } from '@paddle/paddle-node-sdk';

export function getPaddleInstance() {
  const paddleOptions: PaddleOptions = {
    environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as Environment) ?? Environment.sandbox,
    logLevel: LogLevel.error,
  };

  if (!process.env.PADDLE_API_KEY) {
    console.error('Paddle API key is missing');
  }

  return new Paddle(process.env.PADDLE_API_KEY!, paddleOptions);
}

export async function getCustomerId() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.data.user?.email) {
    const customersData = await supabase
      .from('customers')
      .select('customer_id,email')
      .eq('email', user.data.user?.email)
      .single();
    if (customersData?.data?.customer_id) {
      return customersData?.data?.customer_id as string;
    }
  }
  return '';
}


const BASE_API = 'http://localhost:8000/api/v1/accounts'
export const getCustomerIds = createAsyncThunk(
  "customersId",
  async (_, {rejectWithValue}) => {
    try{

      const response = await fetch(`${BASE_API}/users/me`,{
        method: "POST",
        credentials: "include",
      })
      if (response.ok){
        console.log(response.data)
      }
      return response
    }catch(error){
      console.log("error")
    }finally{
      console.log("Finished loading")
    }
    
  },
)


export async function getSubscription(subscriptionId: string): Promise<SubscriptionDetailResponse> {
  try {
    const customerId = await getCustomerId();
    if (customerId) {
      const subscription = await getPaddleInstance().subscriptions.get(subscriptionId, {
        include: ['next_transaction', 'recurring_transaction_details'],
      });

      return { data: parseSDKResponse(subscription) };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: ErrorMessage };
  }
  return { error: ErrorMessage };
}


export async function getSubscriptions(): Promise<SubscriptionResponse> {
  try {
    const customerId = await getCustomerId();
    if (customerId) {
      const subscriptionCollection = getPaddleInstance().subscriptions.list({ customerId: [customerId], perPage: 20 });
      const subscriptions = await subscriptionCollection.next();
      return {
        data: subscriptions,
        hasMore: subscriptionCollection.hasMore,
        totalRecords: subscriptionCollection.estimatedTotal,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return getErrorMessage();
  }
  return getErrorMessage();
}


export async function getTransactions(subscriptionId: string, after: string): Promise<TransactionResponse> {
  try {
    const customerId = await getCustomerId();
    if (customerId) {
      const transactionCollection = getPaddleInstance().transactions.list({
        customerId: [customerId],
        after: after,
        perPage: 10,
        status: ['billed', 'paid', 'past_due', 'completed', 'canceled'],
        subscriptionId: subscriptionId ? [subscriptionId] : undefined,
      });
      const transactionData = await transactionCollection.next();
      return {
        data: parseSDKResponse(transactionData ?? []),
        hasMore: transactionCollection.hasMore,
        totalRecords: transactionCollection.estimatedTotal,
        error: undefined,
      };
    } else {
      return { data: [], hasMore: false, totalRecords: 0 };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return getErrorMessage();
  }
}

