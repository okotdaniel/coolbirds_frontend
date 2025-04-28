
import { createAsyncThunk } from "@reduxjs/toolkit"


export interface HealthCheckProp {
    id?: string
    house: string,
    flock : string,
    age: string,
    status: string,
    date_checked?: Date

}


const BASE_URL = 'http://localhost:8000/api/v1'

export const fetchHealthChecks = createAsyncThunk(
  'health/fetchHealthChecks',
  async (_, { rejectWithValue }) => {
      try {
          const response = await fetch(`${BASE_URL}/health/`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
              throw new Error("Failed to fetch health status");
          }else{
            const data = await response.json();
            return data;
          }
      } catch (error: any) {
          return rejectWithValue(error.message);
      }
  }
);

export const addHealthCheck = createAsyncThunk("production/addRecord", async (record: HealthCheckProp) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return record
})

export const updateHealthCheck = createAsyncThunk("production/updateRecord", async (record: HealthCheckProp) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return record
})

export const deleteHealthCheck = createAsyncThunk("production/deleteRecord", async (id: string) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

// fetchHealthChecks, addHealthCheck, updateHealthCheck, deleteHealthCheck