import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface User {
    id?: number
    email: string
    first_name: string
    last_name: string
   
  }

const BASE_URL = 'http://localhost:8000/api/v1'

export const getUser = createAsyncThunk(
    'users/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/account/users/me/`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Failed to fetch suppliers");
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
  

export const addSupplier = createAsyncThunk(
    'supplier/add/',
    async (body: User, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/supplier/`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        console.log(JSON.stringify(body))
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.log(response.json())
          const errorMsg = "Failed to add supplier";
          toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const updateSupplier = createAsyncThunk(

  'supplier/update/id',
  async (body: User, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/supplier/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorMsg = "Failed to update supplier";
        toast.error(errorMsg);
        return rejectWithValue(errorMsg);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
  

export const deleteSupplier = createAsyncThunk(
    'deleteSupplier',
    async (body: { id: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/supplier/delete`, {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          toast.success("Supplier deleted successfully");
          // Return something indicative, such as the deleted supplier id.
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
  
  export const getSupplierById = createAsyncThunk(
    'getUserById',
    async ({ id }: { id: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/supplier/get/${id}`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          toast.success("Supplier retrieved successfully");
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
  