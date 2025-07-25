import {  createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Supplier {
    id?: number
    name: string
    category: string
    contact: string
    email: string
    phone: string
    address: string
    website: string
    rating: number
    status: string
  }

const baseUrl = 'http://localhost:8000/api/v1'

export const fetchSupplierRecords = createAsyncThunk(
    'suppliers/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/supplier/`, {
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
  


export const supplierByRanking = createAsyncThunk(
  'suppliers/by_ranking',
  async (_, { rejectWithValue }) => {
      try {
          const response = await fetch(`${baseUrl}/supplier/by_ranking/`, {
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


export const addSupplier = createAsyncThunk(
    'supplier/add/',
    async (body: Supplier, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/supplier/`, {
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
  async (body: Supplier, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/supplier/${body.id}`, {
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
    async (id: number , { rejectWithValue }) => {
      try {
        // const id = 
        const response = await fetch(`${baseUrl}/supplier/delete/${id}`, {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          toast.success("Supplier deleted successfully");
          
        } else {
          const errorMsg = "Failed gracefully";
          toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      } finally {
        console.log("Passed!");
      }
    }
  );
  
  export const getSupplierById = createAsyncThunk(
    'getSupplierById',
    async ({ id }: { id: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/supplier/get/${id}`, {
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
  