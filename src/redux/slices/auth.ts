//utils and types
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/types/user'
import { boolean } from 'yup'
import { IWonProduct, TypeId } from '@/types'

export type IInputMode = 'INPUT_OTP' | 'INPUT_PHONE_NUMBER'
interface IInitialState {
  isAuth: boolean
  user: IUser | null
  accessToken: string
  openEmailSentDialog: boolean
  openVerifyPhoneNumberDialog: boolean
  openForgotPasswordDialog: boolean
  openForceLogOutDialog: boolean
  balance: number
  createdProduct: TypeId | null
  tokenExpiredTime: number | null
}

const initialState: IInitialState = {
  isAuth: false,
  user: null,
  accessToken: '',
  openEmailSentDialog: false,
  openVerifyPhoneNumberDialog: false,
  openForgotPasswordDialog: false,
  openForceLogOutDialog: false,
  balance: 0,
  createdProduct: null,
  tokenExpiredTime: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, actions: PayloadAction<boolean>) => {
      state.isAuth = actions.payload
    },
    setAccessToken: (state, actions: PayloadAction<string>) => {
      state.accessToken = actions.payload
    },
    setUser: (state, actions: PayloadAction<IUser | null>) => {
      state.user = actions.payload
    },
    setOpenEmailSentDialog: (state, actions: PayloadAction<boolean>) => {
      state.openEmailSentDialog = actions.payload
    },
    setOpenVerifyPhoneNumberDialog: (
      state,
      actions: PayloadAction<boolean>,
    ) => {
      state.openVerifyPhoneNumberDialog = actions.payload
    },
    setOpenForgotPasswordDialog: (state, actions: PayloadAction<boolean>) => {
      state.openForgotPasswordDialog = actions.payload
    },
    setUserBalance: (state, actions: PayloadAction<number>) => {
      state.balance = actions.payload
    },
    setCreatedProduct: (state, actions: PayloadAction<TypeId | null>) => {
      state.createdProduct = actions.payload
    },
    setTokenExpiredTime: (state, actions: PayloadAction<number | null>) => {
      state.tokenExpiredTime = actions.payload
    },
    setOpenForceLogOutDialog: (state, actions: PayloadAction<boolean>) => {
      state.openForceLogOutDialog = actions.payload
    },
  },
})

export const {
  setAuth,
  setUser,
  setOpenEmailSentDialog,
  setOpenVerifyPhoneNumberDialog,
  setOpenForgotPasswordDialog,
  setUserBalance,
  setAccessToken,
  setCreatedProduct,
  setTokenExpiredTime,
  setOpenForceLogOutDialog,
} = authSlice.actions
export default authSlice.reducer
