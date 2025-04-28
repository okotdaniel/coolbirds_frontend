import { createSlice } from "@reduxjs/toolkit";
import { type Contract, getAllContracts, updateContracts }  from "@/lib/api/supplier/contractApiSlice"



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
        builder.addCase(getAllContracts.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(getAllContracts.fulfilled, (state, action)=>{
            state.loading = false
            state.contracts = action.payload
        })
        builder.addCase(getAllContracts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(updateContracts.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateContracts.fulfilled, (state, action)=>{
            state.loading = false
            state.contracts = action.payload

        })
        builder.addCase(updateContracts.rejected, (state, action)=>{
            state.loading = false
        })
       
    }
})

export { getAllContracts, updateContracts }
export default contractsSlice.reducer
