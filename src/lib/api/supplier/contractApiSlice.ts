import { createAsyncThunk } from "@reduxjs/toolkit";
// import { type Contracts,  } from  "@/lib/redux/slices/supplier/contractsSlice"


export interface Contract{
    supplier: string,
    type: string,
    start_date: Date,
    end_date: String,
    value: string,
    status: string | null,
}

const BASE_API = 'http://localhost:8000/api/v1'
export const getAllContracts = createAsyncThunk(
    "getAllContracts",
    async ( _, {rejectWithValue}) => {
        try{
            const response = await  fetch(`${BASE_API}/contract/`,{
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


export const updateContracts = createAsyncThunk(

    'supplier/update/id',
    async (body: Contract, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_API}/supplier/${body.id}`, {
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
    