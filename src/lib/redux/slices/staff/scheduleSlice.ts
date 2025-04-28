import { createSlice } from "@reduxjs/toolkit";
import { getAllSchedules, addSchedule, updateSchedule, deleteSchedule } from "@/lib/api/staff/scheduleApiSlice";
import { type StaffScheduleProps } from '@/lib/api/staff/scheduleApiSlice'

export interface ScheduleState{
    item: StaffScheduleProps[],
    loading: boolean,
    error: string | null;
}

const initialState: ScheduleState = {
    item: [],
    loading: false,
    error: null
}
const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase( getAllSchedules.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase( getAllSchedules.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload
        })
        builder.addCase( getAllSchedules.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase( addSchedule.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase( addSchedule.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase( addSchedule.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase( updateSchedule.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase( updateSchedule.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase( updateSchedule.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase( deleteSchedule.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase( deleteSchedule.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase( deleteSchedule.rejected, (state, action) => {
            state.loading = false
        })
    }
   
})



export { getAllSchedules, addSchedule, updateSchedule, deleteSchedule } 
export default scheduleSlice.reducer