
import { createAsyncThunk } from "@reduxjs/toolkit"


export interface ProductionProp {
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

const BASE_URL = 'http://localhost:8000/api/v1'

export const fetchProductionRecords = createAsyncThunk(
  'suppliers/fetchProductionRecords',
  async (_, { rejectWithValue }) => {
      try {
          const response = await fetch(`${BASE_URL}/produce/`, {
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

export const addProductionRecord = createAsyncThunk("production/addRecord", async (record: ProductionProp) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return record
})

export const updateProductionRecord = createAsyncThunk("production/updateRecord", async (record: ProductionProp) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return record
})

export const deleteProductionRecord = createAsyncThunk("production/deleteRecord", async (id: string) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

// fetchProductionRecords, addProductionRecord, updateProductionRecord, deleteProductionRecord