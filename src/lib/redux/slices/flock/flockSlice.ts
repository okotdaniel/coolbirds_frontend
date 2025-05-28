import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface Flock {
  id: string
  name: string
  type: string
  breed: string
  house: string
  quantity: number
  age: number
  status: string
  startDate: string
  productionRate: number
  mortality: number
  avgWeight: number
}

interface FlockState {
  flocks: Flock[]
  loading: boolean
  error: string | null
}

// Sample data
const sampleFlocks: Flock[] = [
  {
    id: "FL001",
    name: "Batch A-2025",
    type: "Layer",
    breed: "Hy-Line Brown",
    house: "House 1",
    quantity: 4200,
    age: 145,
    status: "Productive",
    startDate: "Nov 01, 2024",
    productionRate: 92,
    mortality: 1.2,
    avgWeight: 1.8,
  },

]

const initialState: FlockState = {
  flocks: sampleFlocks,
  loading: false,
  error: null,
}

// Simplified async thunks that just return dummy data
export const fetchFlocks = createAsyncThunk("flock/fetchFlocks", async () => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return sampleFlocks
})

export const addFlock = createAsyncThunk("flock/addFlock", async (flock: Flock) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return flock
})

export const updateFlock = createAsyncThunk("flock/updateFlock", async (flock: Flock) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return flock
})

export const deleteFlock = createAsyncThunk("flock/deleteFlock", async (id: string) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

const flockSlice = createSlice({
  name: "flock",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch flocks
      .addCase(fetchFlocks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFlocks.fulfilled, (state, action) => {
        state.loading = false
        state.flocks = action.payload
      })
      .addCase(fetchFlocks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Add flock
      .addCase(addFlock.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addFlock.fulfilled, (state, action) => {
        state.loading = false
        state.flocks.push(action.payload)
      })
      .addCase(addFlock.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Update flock
      .addCase(updateFlock.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateFlock.fulfilled, (state, action) => {
        state.loading = false
        const index = state.flocks.findIndex((flock) => flock.id === action.payload.id)
        if (index !== -1) {
          state.flocks[index] = action.payload
        }
      })
      .addCase(updateFlock.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })

      // Delete flock
      .addCase(deleteFlock.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteFlock.fulfilled, (state, action) => {
        state.loading = false
        state.flocks = state.flocks.filter((flock) => flock.id !== action.payload)
      })
      .addCase(deleteFlock.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  },
})

export const { clearError } = flockSlice.actions

export default flockSlice.reducer

