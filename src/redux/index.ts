import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth'
import cart from './slices/cart'
import filter from './slices/filter'

const store = configureStore({
  reducer: { auth: auth, cart: cart, filter: filter },
}) as any

export type IRootState = ReturnType<typeof store.getState>
export type IStoreDispatch = typeof store.dispatch

export default store
