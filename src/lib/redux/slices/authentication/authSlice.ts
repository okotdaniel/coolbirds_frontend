import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import  { 
  loginUser, 
  registerUser, 
  logoutUser, 
  loginWithGoogle, 
  loginWithFacebook, 
  registerWithGoogle, 
  registerWithFacebook 
} from '@/lib/api/authentication/authApiSlice'

interface User {
  id: string
  name: string
  email?: string
  phoneNumber?: string
  avatar?: string
}

interface AuthState {
  user: User | null 
  isAuthenticated: boolean 
  loading: boolean 
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}


// A slice combines the reducer logic and actions in one place
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
  
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload 
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string 
    })


    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Google login/register
    builder.addCase(loginWithGoogle.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    })
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Facebook login/register
    builder.addCase(loginWithFacebook.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loginWithFacebook.fulfilled, (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    })
    builder.addCase(loginWithFacebook.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Google register
    builder.addCase(registerWithGoogle.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(registerWithGoogle.fulfilled, (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    })
    builder.addCase(registerWithGoogle.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Facebook register
    builder.addCase(registerWithFacebook.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(registerWithFacebook.fulfilled, (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    })
    builder.addCase(registerWithFacebook.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { clearError } = authSlice.actions
// Export the reducer to be used in the store
export default authSlice.reducer

