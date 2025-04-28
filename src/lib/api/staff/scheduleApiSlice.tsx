import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const BASE_URL = 'http://localhost:8000/api/v1'

export interface StaffScheduleProps{
    staff: string, 
    monday_start_time: string,
    monday_end_time: string, 
    tuesday_start_time: string,
    tuesday_end_time: string, 
    wednesday_start_time: string, 
    wednesday_end_time: string,
    thursday_start_time: string,
    thursday_end_time: string,
    friday_start_time: string,  
    friday_end_time: string,
    saturday_start_time: string,
    saturday_end_time: string,  
    sunday_start_time: string, 
    sunday_end_time: string
}

export const getAllSchedules = createAsyncThunk(
    'schedule/getAllSchedules',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/schedule/`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch staff schedule");
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
  

export const addSchedule = createAsyncThunk(
    'schedule/addSchedule/',
    async (body: StaffScheduleProps, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/schedule/`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          const errorMsg = "Failed to update staff";
          toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const updateSchedule = createAsyncThunk(
    'staff/update/id',
    async (body: StaffScheduleProps, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/schedule/update`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          const errorMsg = "Failed to update staff";
          toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const deleteSchedule = createAsyncThunk(
    'deleteSchedule',
    async (body: { id: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/staff/delete`, {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          toast.success("staff deleted successfully");
          // Return something indicative, such as the deleted staff id.
          return body.id;
        } else {
          const errorMsg = "Failed gracefully";
          toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      } finally {
        console.log("Passed !");
      }
    }
  );
  
  export const getScheduleById = createAsyncThunk(
    'getScheduleById',
    async ({ id }: { id: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/staff/get/${id}`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          toast.success("staff retrieved successfully");
          return data;
        } else {
          const errorMsg = "Failed gracefully";
          toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      } finally {
        console.log("Passed !");
      }
    }
  );
  
