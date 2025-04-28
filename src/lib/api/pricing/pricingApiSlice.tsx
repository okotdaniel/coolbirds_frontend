
import { createAsyncThunk } from "@reduxjs/toolkit"

const BASE_URL = 'http://localhost:8000/api/v1'

export interface UserProps{
  id: number,
  first_name: string,
  last_name: string,
  email: string
}

export interface ProductProp {
    id: string
    date: string
    house: string
    quantity: number
    gradeA: number
    gradeB: number
    damaged: number
    rejected: number
    notes: string
  }

export interface TransactionProp {
  id: string
  date: string
  house: string
  quantity: number
  gradeA: number
  gradeB: number
  damaged: number
  rejected: number
  notes: string
}

export interface SubscriptionProp {
    id: string
    date: string
    house: string
    quantity: number
    gradeA: number
    gradeB: number
    damaged: number
    rejected: number
    notes: string
  }

export const fetchCurrentUserId = createAsyncThunk('fetchCurrentUser', async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
  
            if (!response.ok) {
                const data = await response.json();
                console.log(data.email)
                return data.email;
                
            }else{
                throw new Error("Failed to fetch users");
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
  );


  export const fetchSubscriptionRecord = createAsyncThunk(
    'transaction/fetchSubscriptionRecord',
    async (_, { rejectWithValue }) => {
        try {
            const customerId = await fetchCurrentUserId()

            const response = await fetch(`${BASE_URL}/payments/subscription/${customerId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
  
            if (!response.ok) {
                throw new Error("Failed to fetch suppliers");
            }else{
              const data = await response.json();
              return data;
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
  );
  
  export const fetchSubscriptionRecords = createAsyncThunk(
    'transaction/fetchSubscriptionRecords',
    async (_, { rejectWithValue }) => {
        try {
            const customerId = fetchCurrentUserId()

            const response = await fetch(`${BASE_URL}/payments/subscription/${customerId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
  
            if (!response.ok) {
                throw new Error("Failed to fetch suppliers");
            }else{
              const data = await response.json();
              return data;
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
  );


export const fetchTransactionRecords = createAsyncThunk(
  'transaction/fetchTransactionRecords',
  async (_, { rejectWithValue }) => {
      try {
          const response = await fetch(`${BASE_URL}/payments/transactions/`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
              throw new Error("Failed to fetch suppliers");
          }else{
            const data = await response.json();
            return data;
          }
      } catch (error: any) {
          return rejectWithValue(error.message);
      }
  }
);

// transaction records
export const addTransactionRecord = createAsyncThunk("payments/production/addRecord", async (record: TransactionProp) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return record
})

export const updateTransactionRecord = createAsyncThunk("payments/production/updateRecord", async (record: TransactionProp) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return record
})

export const deleteTransactionRecord = createAsyncThunk("payments/production/deleteRecord", async (id: string) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

// subscription records
export const addSubscriptionRecord = createAsyncThunk("payments/production/addRecord", async (record: SubscriptionProp) => {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return record
})
  
export const updateSubscriptionRecord = createAsyncThunk("payments/production/updateRecord", async (record: SubscriptionProp) => {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return record
})

export const deleteSubscriptionRecord = createAsyncThunk("deleteRecord", async (subscriptionId: string, {rejectWithValue}) => {
    // Simulate a delay
    try {
        
        const response = await fetch(`${BASE_URL}/payments/subscription/${subscriptionId}/cancel`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.email)
            return data.email;
            
        }else{
            throw new Error("Failed to fetch users");
        }
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
  })