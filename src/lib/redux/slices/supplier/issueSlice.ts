import { createSlice } from "@reduxjs/toolkit";
import { type Issues, fetchIssueRecords, updateIssueRecord, deleteIssueRecord }  from "@/lib/api/supplier/issuesApiSlice"



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
        builder.addCase(fetchIssueRecords.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(fetchIssueRecords.fulfilled, (state, action)=>{
            state.loading = false
            state.issues = action.payload
        })
        builder.addCase(fetchIssueRecords.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(updateIssueRecord.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateIssueRecord.fulfilled, (state, action)=>{
            state.loading = false
            state.issues = action.payload

        })
        builder.addCase(updateIssueRecord.rejected, (state, action)=>{
            state.loading = false
        })
       
    }
})

export { fetchIssueRecords, updateIssueRecord }
export default contractsSlice.reducer
