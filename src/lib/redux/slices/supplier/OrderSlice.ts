import { createSlice } from "@reduxjs/toolkit";
import { type Order, supplierStatistics, fetchOrderRecords, updateOrderRecord, deleteOrderRecord, }  from "@/lib/api/supplier/orderApiSlice"

interface orderState{
    orders: Order[];
    statistics: Order[],
    loading: false;
    error: string | null;
}

const initialState: orderState = {
    orders: [],
    statistics: [],
    loading: false,
    error: null,
}

const  orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers:{ },
    extraReducers: (builder)=>{
        builder.addCase(fetchOrderRecords.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(fetchOrderRecords.fulfilled, (state, action)=>{
            state.loading = false
            state.orders = action.payload
        })
        builder.addCase(fetchOrderRecords.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(deleteOrderRecord.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(deleteOrderRecord.fulfilled, (state, action)=>{
            state.loading = false
            state.orders = action.payload
        })
        builder.addCase(deleteOrderRecord.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(updateOrderRecord.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateOrderRecord.fulfilled, (state, action)=>{
            state.loading = false
            state.orders = action.payload

        })
        builder.addCase(updateOrderRecord.rejected, (state, action)=>{
            state.loading = false
        })

        builder.addCase(supplierStatistics.pending, (state, action)=>{
            state.loading = false;
        })
        builder.addCase(supplierStatistics.fulfilled, (state, action)=>{
            state.loading = false;
            state.statistics = action.payload;

        })
        builder.addCase(supplierStatistics.rejected, (state, action)=>{
            state.loading = false;
        })

    }
})

export { fetchOrderRecords, updateOrderRecord, deleteOrderRecord, supplierStatistics }
export default orderSlice.reducer
