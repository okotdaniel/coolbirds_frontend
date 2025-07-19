import { configureStore } from "@reduxjs/toolkit"
// import authReducer from "@/lib/redux/slices/authentication/authSlice"
import { authenticationApi } from "@/lib/api/authentication/beta/AuthApiSlice"
import supplierReducer from "@/lib/redux/slices/supplier/supplierSlice"
import aiReducer  from "@/lib/redux/slices/ai/aiSlice"
import flockReducer  from "@/lib/redux/slices/flock/flockSlice"
import staffReducer  from "@/lib/redux/slices/staff/staffSlice"
import usersReducer from "@/lib/redux/slices/users/usersSlice"
import contractsReducer  from "@/lib/redux/slices/supplier/contractSlice"
import issuesReducer  from "@/lib/redux/slices/supplier/issueSlice"
import ordersReducer  from "@/lib/redux/slices/supplier/OrderSlice"
import productionReducer from "@/lib/redux/slices/production/productionSlice"
import healthReducer from "@/lib/redux/slices/health/healthSlice"
import vaccineReducer from "@/lib/redux/slices/health/vaccineSlice"
import scheduleReducer  from "@/lib/redux/slices/staff/scheduleSlice"
import subscriptionReducer  from "@/lib/redux/slices/pricing/subscriptionSlice"
import transactionReducer  from "@/lib/redux/slices/pricing/transactionSlice"
import { healthApi } from "../slices/health/beta/healthslice"


export const store = configureStore({
  reducer: {
    // auth: authReducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [healthApi.reducerPath]: healthApi.reducer,

    suppliers: supplierReducer,
    ranking: supplierReducer,
    staff: staffReducer,
    schedule: scheduleReducer,
    users: usersReducer,
    flock: flockReducer,
    contracts: contractsReducer,
    orders: ordersReducer,
    statistics: ordersReducer,
    issues: issuesReducer,
    produce: productionReducer,
    health: healthReducer,
    vaccine: vaccineReducer,
    ai: aiReducer,
    subscription: subscriptionReducer,
    transaction: transactionReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    [
      authenticationApi.middleware,
      healthApi.middleware,
    ]
  ),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
