//utils and types
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type IPaymentType = 'PRE_SALE_FEE' | 'AUCTION_FEE'
type IMethodSelected = 'paypal' | 'stripe'

interface IInitialState {
  paymentId: string | null
  payerId: string | null
  paymentType: IPaymentType | null
  methodSelected: IMethodSelected
}

const initialState: IInitialState = {
  paymentId: null,
  payerId: null,
  paymentType: null,
  methodSelected: 'paypal',
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentId: (state, actions: PayloadAction<string | null>) => {
      state.paymentId = actions.payload
    },
    setPayerId: (state, actions: PayloadAction<string | null>) => {
      state.payerId = actions.payload
    },
    setPaymentType: (state, actions: PayloadAction<IPaymentType | null>) => {
      state.paymentType = actions.payload
    },
    setMethodSelected: (state, actions: PayloadAction<IMethodSelected>) => {
      state.methodSelected = actions.payload
    },
  },
})

export const { setPaymentId, setPayerId, setPaymentType, setMethodSelected } =
  paymentSlice.actions
export default paymentSlice.reducer
