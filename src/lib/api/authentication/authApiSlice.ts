import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { redirect } from 'next/navigation'

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
interface LoginCredential { 
  email: string
  password: string 
}

interface RegisterInterface{
  first_name: string
  last_name: string
  email: string,
  password: string
  re_password: string
  // acceptTerms: boolean,
}

const BASE_URL = 'http://localhost:8000/api/v1'


export const loginUser = createAsyncThunk( 
  "accounts/login", 
  async (credentials: LoginCredential, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/accounts/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      if (response.ok) {
        toast.success(`Welcome, ${response}`)
        redirect('/login')
        return await response.json()
      }else{
        toast.error(`Something happend, try again`)
        console.log(response)
        
      }
      

      
    } catch (error: any ) {
      return rejectWithValue(error.message)
    }
  },
)

export const registerUser = createAsyncThunk(
  "account/register",
  async (credentials: RegisterInterface, { rejectWithValue }) => {
    try {

      const response = await fetch(`${BASE_URL}/account/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      if (response.ok) {
        toast.success(`Please check your email to verify account `)
        redirect('/login')
        return await response.json()
      }else{
        toast.error(`Something happend, Please try again`)
        console.log(response)

      }
      

    } catch (error: any ) {
      return rejectWithValue(error.message)
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch('/api/auth/logout', {
    //   method: 'POST',
    // })
    // if (!response.ok) throw new Error('Logout failed')
    // return await response.json()

    // Simulated API response
    return { success: true }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would handle OAuth flow with Google
    // Usually involves redirecting to Google's auth page and handling the callback

    // Simulated API response
    return {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://example.com/avatar.jpg",
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const loginWithFacebook = createAsyncThunk("auth/loginWithFacebook", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would redirect to Facebook OAuth
    // and then handle the callback

    // Simulated API response
    return {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://example.com/avatar.jpg",
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const registerWithGoogle = createAsyncThunk("auth/registerWithGoogle", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would redirect to Google OAuth
    // and then handle the callback

    // Simulated API response
    return {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://example.com/avatar.jpg",
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const registerWithFacebook = createAsyncThunk("auth/registerWithFacebook", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would redirect to Facebook OAuth
    // and then handle the callback

    // Simulated API response
    return {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://example.com/avatar.jpg",
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

