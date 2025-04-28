import { createAsyncThunk } from "@reduxjs/toolkit";
// import { type Contracts,  } from  "@/lib/redux/slices/supplier/contractsSlice"


export interface Issues{
    date_created: string,
    supplier: string,
    issue: string,
    status: string,
}


const BASE_API = 'http://localhost:8000/api/v1'
export const getAllIssues = createAsyncThunk(
    "getAllIssues",
    async ( _, {rejectWithValue}) => {
        try{
            const response = await  fetch(`${BASE_API}/issue/`,{
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


export const updateIssues = createAsyncThunk(

    'supplier/update/id',
    async (body: Issues, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_API}/issue/${body.id}`, {
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
    