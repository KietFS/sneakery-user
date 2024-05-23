import { TypeId } from '../common'
import { IPaymentType } from '../payment'
import { IProductDetail } from '../product'

type IRole = 'ROLE_USER'

export interface IUser {
  id: string
  username: string
  email: string
  phoneNumber: string
  roles: IRole[]
  token: string
}

export interface IAddress {
  city: string
  district: string
  ward: string
  addressDetail: string
}

export type IPaymentMethod = 'stripe' | 'paypal'

export interface IAddressResponse {
  addressId: number
  homeNumber: string
  cityName: string
  district: IOption
  ward: IOption
}

export interface IBidItem {
  bidId: TypeId
  bidStartingDate: string
  priceStart: number
  stepBid: number
  priceWin: number | null
  product: IProductDetail
}

export interface ITransactionHistoryItem {
  id: TypeId
  createdAt: string
  amount: number
  type: IPaymentType
  bid: IBidItem | null
}
