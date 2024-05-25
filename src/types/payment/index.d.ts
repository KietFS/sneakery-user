import { TypeId } from '../common'

export interface IPayPreeSaleFeePayload {
  purpose: string
  amount: number
}

export interface IPayForProductPayload extends IPayPreeSaleFeePayload {}

export type IPaymentType = 'PAID' | 'PRE_SALE_FEE' | 'AUCTION_FEE'

export type IPaymentStatus = 'PENDING' | 'OVERDUE' | 'COMPLETED'
