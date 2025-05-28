import { createSlice } from "@reduxjs/toolkit";
import { type Contract,fetchContractRecords, updateContractRecord }  from "@/lib/api/supplier/contracts/contractApiSlice"


interface contractsState{
    contracts: Contract[];
    loading: false;
    error: string | null;
}

const initialState: contractsState = {
    contracts: [],
    loading: false,
    error: null,
}

const  contractsSlice = createSlice({
    name: "contracts",
    initialState,
    reducers:{ },
    extraReducers: (builder)=>{
        builder.addCase(fetchContractRecords.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(fetchContractRecords.fulfilled, (state, action)=>{
            state.loading = false
            state.contracts = action.payload
        })
        builder.addCase(fetchContractRecords.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(updateContractRecord.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateContractRecord.fulfilled, (state, action)=>{
            state.loading = false
            state.contracts = action.payload

        })
        builder.addCase(updateContractRecord.rejected, (state, action)=>{
            state.loading = false
        })
       
    }
})

export { fetchContractRecords, updateContractRecord }
export default contractsSlice.reducer
