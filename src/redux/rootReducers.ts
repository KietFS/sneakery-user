import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth'
import cart from './slices/cart'
import filter from './slices/filter'
import category from './slices/category'

const rootReducer = combineReducers({
  auth: auth,
  cart: cart,
  filter: filter,
  category: category,
}) as any


export default rootReducer