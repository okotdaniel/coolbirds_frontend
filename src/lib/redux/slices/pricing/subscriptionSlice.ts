import { createSlice  } from "@reduxjs/toolkit"
  
import {
    type SubscriptionProp,
    fetchSubscriptionRecords,  
    addSubscriptionRecord, 
    updateSubscriptionRecord, 
    deleteSubscriptionRecord,
 } from "@/lib/api/pricing/pricingApiSlice"

interface SubscriptionState {
  subscriber: SubscriptionProp[]
  loading: boolean
  error: string | null
}
  
const initialState: SubscriptionState = {
  subscriber: [],
  loading: false,
  error: null,
}

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
      // Fetch records
      builder.addCase(fetchSubscriptionRecords.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(fetchSubscriptionRecords.fulfilled, (state, action) => {
        state.loading = false
        state.subscriber = action.payload
      })
      builder.addCase(fetchSubscriptionRecords.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Add record
      builder.addCase(addSubscriptionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(addSubscriptionRecord.fulfilled, (state, action) => {
        state.loading = false
        state.subscriber.push(action.payload)
      })
      builder.addCase(addSubscriptionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Update record
      builder.addCase(updateSubscriptionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(updateSubscriptionRecord.fulfilled, (state, action) => {
        state.loading = false
        const index = state.subscriber.findIndex((record) => record.id === action.payload.id)
        if (index !== -1) {
          state.subscriber[index] = action.payload
        }
      })
      builder.addCase(updateSubscriptionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Delete record
      builder.addCase(deleteSubscriptionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(deleteSubscriptionRecord.fulfilled, (state, action) => {
        state.loading = false
        state.subscriber = state.subscriber.filter((record) => record.id !== action.payload)
      })
      builder.addCase(deleteSubscriptionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  },
})

export const { clearError } = subscriberSlice.actions

export default subscriberSlice.reducer
