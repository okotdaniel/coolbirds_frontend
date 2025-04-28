import { createSlice } from "@reduxjs/toolkit";
import { getAllStaff, addStaff, updateStaff, deleteStaff } from "@/lib/api/staff/staffApiSlice";
import { type Staff } from '@/lib/api/staff/staffApiSlice'

export interface StaffState{
    staff: Staff[],
    loading: boolean,
    error: string | null;
}

const initialState: StaffState = {
    staff: [],
    loading: false,
    error: null
}
const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase( getAllStaff.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase( getAllStaff.fulfilled, (state, action) => {
            state.loading = false
            state.staff = action.payload
        })
        builder.addCase( getAllStaff.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase( addStaff.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase( addStaff.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase( addStaff.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase( updateStaff.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase( updateStaff.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase( updateStaff.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase( deleteStaff.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase( deleteStaff.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase( deleteStaff.rejected, (state, action) => {
            state.loading = false
        })
    }
   
})



export { getAllStaff, addStaff, updateStaff, deleteStaff } 
export default staffSlice.reducer