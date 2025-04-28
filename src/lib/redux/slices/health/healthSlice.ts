import { createSlice } from '@reduxjs/toolkit'
import { type HealthCheckProp, fetchHealthChecks, addHealthCheck, updateHealthCheck, deleteHealthCheck } from '@/lib/api/health/healthApiSlice'


interface healthState{
    item: HealthCheckProp[],
    loading: boolean,
    error: string | null
}

const initialState: healthState = {
  item: [],
  loading: false,
  error: null,
}

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
      // Fetch records
      builder.addCase(fetchHealthChecks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(fetchHealthChecks.fulfilled, (state, action) => {
        state.loading = false
        state.item = action.payload
      })
      builder.addCase(fetchHealthChecks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Add record
      builder.addCase(addHealthCheck.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(addHealthCheck.fulfilled, (state, action) => {
        state.loading = false
        state.item.push(action.payload)
      })
      builder.addCase(addHealthCheck.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Update record
      builder.addCase(updateHealthCheck.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(updateHealthCheck.fulfilled, (state, action) => {
        state.loading = false
        const index = state.item.findIndex((record) => record.id === action.payload.id)
        if (index !== -1) {
          state.item[index] = action.payload
        }
      })
      builder.addCase(updateHealthCheck.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Delete record
      builder.addCase(deleteHealthCheck.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(deleteHealthCheck.fulfilled, (state, action) => {
        state.loading = false
        state.item = state.item.filter((record) => record.id !== action.payload)
      })
      builder.addCase(deleteHealthCheck.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  },
})

export const { clearError } = healthSlice.actions

export default healthSlice.reducer
