import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`

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


export const fetchStaffRecords = createAsyncThunk(
    'staff/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/staff/`, {
                method: "GET",
                credentials:"include",
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
        const response = await fetch(`${baseUrl}/staff/`, {
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
        const response = await fetch(`${baseUrl}/staff/update`, {
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
    async ( id: number, { rejectWithValue }) => {
      try {

        const response = await fetch(`${baseUrl}/staff/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify(body),
        });
        if (response.ok) {
          toast.success("staff deleted successfully");
          return response;
        } else {
          const errorMsg = "Failed to delete staff";
          toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      } finally {
        console.log("Finally failed to delte !");
      }
    }
  );
  
  export const getStaffById = createAsyncThunk(
    'getstaffById',
    async ({ id }: { id: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/staff/get/${id}`, {
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
  
