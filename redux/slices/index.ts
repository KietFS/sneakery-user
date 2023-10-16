import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import filter from './filter'
import cart from './cart'

export const reducer = combineReducers({
  auth,
  filter,
  cart,
})
