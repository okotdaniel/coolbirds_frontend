import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const BASE_URL = 'http://localhost:8000/api/v1'

export interface Staff{
    name: string
    position: string,
    department: string
    email: string,
    phone: number,
    status: string,
    joinDate: string,
    avatar: string,
}


export const getAllStaff = createAsyncThunk(
    'staff/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/staff/`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch staffs");
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
  

export const addStaff = createAsyncThunk(
    'staff/add/',
    async (body: Staff, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/staff/`, {
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
  

  export const updateStaff = createAsyncThunk(
    'staff/update/id',
    async (body: Staff, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/staff/update`, {
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
  

export const deleteStaff = createAsyncThunk(
    'deletestaff',
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
  
  export const getStaffById = createAsyncThunk(
    'getstaffById',
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
  
