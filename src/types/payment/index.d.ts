import { TypeId } from '../common'

export interface IPayPreeSaleFeePayload {
  purpose: string
  amount: number
}

export interface IPayForProductPayload extends IPayPreeSaleFeePayload {}
