import { createSlice  } from "@reduxjs/toolkit"
  
import {
    type TransactionProp, 
    fetchTransactionRecords, 
    addTransactionRecord, 
    updateTransactionRecord, 
    deleteTransactionRecord,
 } from "@/lib/api/pricing/pricingApiSlice"

interface TransactionState {
    transaction: TransactionProp[]
    loading: boolean
    error: string | null
}
  
const initialState: TransactionState = {
    transaction: [],
    loading: false,
    error: null,
}

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
      // Fetch records
      builder.addCase(fetchTransactionRecords.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(fetchTransactionRecords.fulfilled, (state, action) => {
        state.loading = false
        state.transaction = action.payload
      })
      builder.addCase(fetchTransactionRecords.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Add record
      builder.addCase(addTransactionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(addTransactionRecord.fulfilled, (state, action) => {
        state.loading = false
        state.transaction.push(action.payload)
      })
      builder.addCase(addTransactionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Update record
      builder.addCase(updateTransactionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(updateTransactionRecord.fulfilled, (state, action) => {
        state.loading = false
        const index = state.transaction.findIndex((record) => record.id === action.payload.id)
        if (index !== -1) {
          state.transaction[index] = action.payload
        }
      })
      builder.addCase(updateTransactionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Delete record
      builder.addCase(deleteTransactionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(deleteTransactionRecord.fulfilled, (state, action) => {
        state.loading = false
        state.transaction = state.transaction.filter((record) => record.id !== action.payload)
      })
      builder.addCase(deleteTransactionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  },
})

export const { clearError } = transactionSlice.actions

export default transactionSlice.reducer
