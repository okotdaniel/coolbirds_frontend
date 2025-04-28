import { createSlice  } from "@reduxjs/toolkit"
  
import {type ProductionProp, fetchProductionRecords, addProductionRecord, updateProductionRecord, deleteProductionRecord } from "@/lib/api/production/producerApiSlice"

interface ProductionState {
  produce: ProductionProp[]
  loading: boolean
  error: string | null
}
  
const initialState: ProductionState = {
  produce: [],
  loading: false,
  error: null,
}

const productionSlice = createSlice({
  name: "produce",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
      // Fetch records
      builder.addCase(fetchProductionRecords.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(fetchProductionRecords.fulfilled, (state, action) => {
        state.loading = false
        state.produce = action.payload
      })
      builder.addCase(fetchProductionRecords.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Add record
      builder.addCase(addProductionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(addProductionRecord.fulfilled, (state, action) => {
        state.loading = false
        state.produce.push(action.payload)
      })
      builder.addCase(addProductionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Update record
      builder.addCase(updateProductionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(updateProductionRecord.fulfilled, (state, action) => {
        state.loading = false
        const index = state.produce.findIndex((record) => record.id === action.payload.id)
        if (index !== -1) {
          state.produce[index] = action.payload
        }
      })
      builder.addCase(updateProductionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Delete record
      builder.addCase(deleteProductionRecord.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(deleteProductionRecord.fulfilled, (state, action) => {
        state.loading = false
        state.produce = state.produce.filter((record) => record.id !== action.payload)
      })
      builder.addCase(deleteProductionRecord.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  },
})

export const { clearError } = productionSlice.actions

export default productionSlice.reducer
