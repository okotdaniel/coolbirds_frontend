import { createSlice } from '@reduxjs/toolkit'
import { type VaccineProps, fetchVaccineSchedule, addVaccineSchedule, updateVaccineSchedule, deleteVaccineSchedule } from '@/lib/api/health/vaccineApiSlice'


interface vaccineState{
  item: VaccineProps[],
  loading: boolean,
  error: string | null
}

const initialState: vaccineState = {
  item: [],
  loading: false,
  error: null,
}

const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
      // Fetch records
      builder.addCase(fetchVaccineSchedule.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(fetchVaccineSchedule.fulfilled, (state, action) => {
        state.loading = false
        state.item = action.payload
      })
      builder.addCase(fetchVaccineSchedule.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Add record
      builder.addCase(addVaccineSchedule.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(addVaccineSchedule.fulfilled, (state, action) => {
        state.loading = false
        state.item.push(action.payload)
      })
      builder.addCase(addVaccineSchedule.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Update record
      builder.addCase(updateVaccineSchedule.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(updateVaccineSchedule.fulfilled, (state, action) => {
        state.loading = false
        const index = state.item.findIndex((record) => record.id === action.payload.id)
        if (index !== -1) {
          state.item[index] = action.payload
        }
      })
      builder.addCase(updateVaccineSchedule.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Delete record
      builder.addCase(deleteVaccineSchedule.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(deleteVaccineSchedule.fulfilled, (state, action) => {
        state.loading = false
        state.item = state.item.filter((record) => record.id !== action.payload)
      })
      builder.addCase(deleteVaccineSchedule.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  },
})

export const { clearError } = vaccineSlice.actions

export default vaccineSlice.reducer
