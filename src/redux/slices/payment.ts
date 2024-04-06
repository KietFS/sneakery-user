//utils and types
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type IPaymentType = 'PRE_SALE_FEE' | 'AUCTION_FEE'

interface IInitialState {
  paymentId: string | null
  payerId: string | null
  paymentType: IPaymentType | null
}

const initialState: IInitialState = {
  paymentId: null,
  payerId: null,
  paymentType: null,
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentId: (state, actions: PayloadAction<string | null>) => {
      state.paymentId = actions.payload
    },
  },
})

export const { setPaymentId } = paymentSlice.actions
export default paymentSlice.reducer
