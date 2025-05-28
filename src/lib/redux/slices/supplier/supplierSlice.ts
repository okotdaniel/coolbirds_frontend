import { createSlice } from "@reduxjs/toolkit";
import { type Supplier,  
    fetchSupplierRecords, 
    addSupplier, 
    updateSupplier, 
    deleteSupplier,
    supplierByRanking,
} from '@/lib/api/supplier/supplierApiSlice'

  interface SupplierState {
    suppliers: Supplier[]; 
    ranking: Supplier[]
    status: string,
    loading: boolean;
    error: string | null;
  }
  
  const initialState: SupplierState = {
    suppliers: [],
    ranking: [],
    status: 'idle',
    loading: false,
    error: null,
  };
  

const supplierSlice = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchSupplierRecords.pending, (state) => {
            state.loading = true;
        })
        builder.addCase( fetchSupplierRecords.fulfilled, (state, action) =>{
            state.loading = false;
            state.suppliers = action.payload;
        })
        builder.addCase( fetchSupplierRecords.rejected, (state, action)=>{
            state.loading = false;
            // state.error = action.error.message;
        })

        // add suppliers 
        builder.addCase(addSupplier.pending, (state) => {
            state.loading = true;
        })
        builder.addCase( addSupplier.fulfilled, (state, action) =>{
            state.loading = false;
            state.suppliers = action.payload;
        })
        builder.addCase( addSupplier.rejected, (state, action)=>{
            state.loading = false;
            // state.error = action.error.message;
        })

        // updateSupplier
        builder.addCase(updateSupplier.pending, (state) => {
            state.loading = true;
        })
        builder.addCase( updateSupplier.fulfilled, (state, action) =>{
            state.loading = false;
            state.suppliers = action.payload;
        })
        builder.addCase( updateSupplier.rejected, (state, action)=>{
            state.loading = false;
            // state.error = action.error.message;
        })

        builder.addCase(deleteSupplier.fulfilled, (state, action)=>{
            state.loading = false;
        })

        builder.addCase(supplierByRanking.pending, (state, action)=>{
            state.loading = false;
        })
        builder.addCase(supplierByRanking.fulfilled, (state, action)=>{
            state.loading = false;
            state.ranking = action.payload;

        })
        builder.addCase(supplierByRanking.rejected, (state, action)=>{
            state.loading = false;
        })
  
            
    }
})
export { fetchSupplierRecords, addSupplier, updateSupplier, deleteSupplier, supplierByRanking };
export default supplierSlice.reducer
