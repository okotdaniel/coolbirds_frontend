import { createSlice } from "@reduxjs/toolkit";
import { type Issues, getAllIssues, updateIssues }  from "@/lib/api/supplier/issuesApiSlice"



interface contractsState{
    issues: Issues[];
    loading: false;
    error: string | null;

}

const initialState: contractsState = {
    issues: [],
    loading: false,
    error: null,
}

const  contractsSlice = createSlice({
    name: "issues",
    initialState,
    reducers:{ },
    extraReducers: (builder)=>{
        builder.addCase(getAllIssues.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(getAllIssues.fulfilled, (state, action)=>{
            state.loading = false
            state.issues = action.payload
        })
        builder.addCase(getAllIssues.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(updateIssues.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateIssues.fulfilled, (state, action)=>{
            state.loading = false
            state.issues = action.payload

        })
        builder.addCase(updateIssues.rejected, (state, action)=>{
            state.loading = false
        })
       
    }
})

export { getAllIssues, updateIssues }
export default contractsSlice.reducer
