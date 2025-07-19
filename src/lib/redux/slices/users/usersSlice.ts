import { createSlice } from "@reduxjs/toolkit";
import { type User, getUser } from '@/lib/api/users/usersApiSlice'

  interface UserState {
    users: User[]; 
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
  };
  

const supplierSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getUser.pending, (state) => {
            state.loading = true;
        })
        .addCase( getUser.fulfilled, (state, action) =>{
            state.loading = false;
            state.users = action.payload;
        })
        .addCase( getUser.rejected, (state, action)=>{
            state.loading = false;
            // state.error = action.error.message;
        })
        
    }
})
export { getUser,  };
export default supplierSlice.reducer
