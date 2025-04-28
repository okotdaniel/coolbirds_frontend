import { createSlice } from "@reduxjs/toolkit";
import { type Order, getAllOrders, updateOrder, supplierStatistics, }  from "@/lib/api/supplier/orderApiSlice"



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
        builder.addCase(getAllOrders.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(getAllOrders.fulfilled, (state, action)=>{
            state.loading = false
            state.orders = action.payload
        })
        builder.addCase(getAllOrders.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(updateOrder.pending, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateOrder.fulfilled, (state, action)=>{
            state.loading = false
            state.orders = action.payload

        })
        builder.addCase(updateOrder.rejected, (state, action)=>{
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

export { getAllOrders, updateOrder, supplierStatistics }
export default orderSlice.reducer
