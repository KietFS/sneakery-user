import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth'
import cart from './slices/cart'
import filter from './slices/filter'
import category from './slices/category'
import payment from './slices/payment'

const rootReducer = combineReducers({
  auth: auth,
  cart: cart,
  filter: filter,
  category: category,
  payment: payment,
}) as any

export default rootReducer
