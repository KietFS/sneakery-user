//utils and types
import { IWonProduct } from '@/types/product'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type IPaymentType = 'PRE_SALE_FEE' | 'AUCTION_FEE'
type IMethodSelected = 'paypal' | 'stripe'

interface IInitialState {
  paymentId: string | null
  payerId: string | null
  paymentType: IPaymentType | null
  methodSelected: IMethodSelected
  wonProductSelected: IWonProduct | null
}

const initialState: IInitialState = {
  paymentId: null,
  payerId: null,
  paymentType: null,
  methodSelected: 'paypal',
  wonProductSelected: null,
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
    setWonProductSelected: (
      state,
      actions: PayloadAction<IWonProduct | null>,
    ) => {
      state.wonProductSelected = actions.payload
    },
  },
})

export const {
  setPaymentId,
  setPayerId,
  setPaymentType,
  setMethodSelected,
  setWonProductSelected,
} = paymentSlice.actions
export default paymentSlice.reducer
