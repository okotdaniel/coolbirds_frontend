import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/lib/redux/store/stores'
import type { TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
