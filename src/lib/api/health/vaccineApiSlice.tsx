
import { createAsyncThunk } from "@reduxjs/toolkit"


export interface VaccineProps {
    id?: string
    flock : string,
    vaccine_name: string,
    date_administered: string,
    schedule: string,
    administered_by: string,
    status: string,
}



const BASE_URL = 'http://localhost:8000/api/v1'

export const fetchVaccineSchedule = createAsyncThunk(
  'suppliers/fetchVaccineSchedule',
  async (_, { rejectWithValue }) => {
      try {
          const response = await fetch(`${BASE_URL}/vaccine/`, {
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

export const addVaccineSchedule = createAsyncThunk("production/addRecord", async (record: VaccineProps) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return record
})

export const updateVaccineSchedule = createAsyncThunk("production/updateRecord", async (record: VaccineProps) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return record
})

export const deleteVaccineSchedule = createAsyncThunk("production/deleteRecord", async (id: string) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

// fetchHealthChecks, addHealthCheck, updateHealthCheck, deleteHealthCheck