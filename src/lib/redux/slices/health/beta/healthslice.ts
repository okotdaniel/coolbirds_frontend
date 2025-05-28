import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {  BaseQueryFn, FetchArgs, FetchBaseQueryError, } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { authenticate, logout } from '@/lib/redux/slices/authentication/beta/authSlice'

interface User {
	first_name: string;
	last_name: string;
	email: string;
}


interface SocialAuthArgs {
	provider: string;
	state: string;
	code: string;
}

interface CreateUserResponse {
	success: boolean;
	user: User;
}

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ 
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: 'include' 
})

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:8000/api/v1',
// 	prepareHeaders: (headers, { getState }) => {
// 	  const token = getState().auth.token
// 	  if (token) {
// 		headers.set('authorization', `Bearer ${token}`)
// 	  }
// 	  return headers
// 	}
//   })
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,unknown,FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()

	console.log("ARGS:", args);
	let result = await baseQuery(args, api, extraOptions);
	console.log("RESULT:", result.error?.data);

  	if (result.error && result.error.status === 401) {
    	if (!mutex.isLocked()) {
      		const release = await mutex.acquire()
		try {
			const refreshResult = await baseQuery(
			{
				url: '/accounts/refresh/',
				method: 'POST',	
			},
			api,
			extraOptions,
			)
			if (refreshResult.data) {
				api.dispatch(authenticate())
				result = await baseQuery(args, api, extraOptions)
			} else {
				api.dispatch(logout())
			}
		} finally {
			release()
		}
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const healthApi = createApi({
    reducerPath: 'healthApi',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
		health: builder.query({
			query: () => ({
				url: '/health/',
				method: 'GET',
			}),
		}),
		vaccine: builder.query({
			query: () => ({
				url: '/vaccine/',
				method: 'GET',
			}),
		}),

		// register: builder.mutation({
		// 	query: ( {first_name, last_name, email, password, re_password,} ) => ({
		// 		url: '/account/users/',
		// 		method: 'POST',
		// 		body: { first_name, last_name, email, password, re_password },
		// 	}),
		// }),
		
		// socialAuthenticate: builder.mutation<CreateUserResponse,SocialAuthArgs>({
		// 	query: ({ provider, state, code }) => ({
		// 		url: `/o/${provider}/?state=${encodeURIComponent(
		// 			state
		// 		)}&code=${encodeURIComponent(code)}`,
		// 		method: 'POST',
		// 		headers: {
		// 			Accept: 'application/json',
		// 			'Content-Type': 'application/x-www-form-urlencoded',
		// 		},
		// 	}),
		// }),
		
		
	}),
})

export const {
	useHealthQuery,
	useVaccineQuery,
} = healthApi;
