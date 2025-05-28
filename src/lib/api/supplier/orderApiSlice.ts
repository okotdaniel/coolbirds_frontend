import { createAsyncThunk } from "@reduxjs/toolkit";


export interface Order{
    supplier: string
    orders: string
    order_date: string
    delivery_date: string
    status: string

}


const BASE_API = 'http://localhost:8000/api/v1'

export const fetchOrderRecords = createAsyncThunk(
    "fetchOrderRecords",
    async ( _, {rejectWithValue}) => {
        try{
            const response = await  fetch(`${BASE_API}/order/`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                // credentials: "include"
            })
            if (!response.ok){
              throw new Error("Failed to fetch suppliers");
            }else{
              const data = await response.json();
              return data;
            }
            
        }catch(error){
            rejectWithValue(error.message)
        }finally{
            console.log("finally")
        }

    }
)

export const supplierStatistics = createAsyncThunk(
  'order/statistics',
  async (_, { rejectWithValue }) => {
      try {
          const response = await fetch(`${BASE_API}/order/statistics/`, {
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

export const updateOrderRecord = createAsyncThunk(

    'updateOrderRecord/id',
    async (body: Order, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_API}/order/${body.id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          const errorMsg = "Failed to update supplier";
        //   toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);
   
export const deleteOrderRecord = createAsyncThunk(
    "deleteOrderRecord",
    async ( _, {rejectWithValue}) => {
        try{
            const response = await  fetch(`${BASE_API}/order/`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                // credentials: "include"
            })
            if (!response.ok){
              throw new Error("Failed to fetch suppliers");
            }else{
              const data = await response.json();
              return data;
            }
            
        }catch(error){
            rejectWithValue(error.message)
        }finally{
            console.log("finally")
        }

    }
)
