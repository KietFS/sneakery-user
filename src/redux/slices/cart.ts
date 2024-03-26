//utils and types
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItem } from '@/containers/cart/CartList'

interface IInitialState {
  items: ICartItem[]
}

const initialState: IInitialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setGlobalCartItems: (state, actions: PayloadAction<ICartItem[]>) => {
      state.items = actions.payload
    },
  },
})

export const { setGlobalCartItems } = cartSlice.actions
export default cartSlice.reducer
