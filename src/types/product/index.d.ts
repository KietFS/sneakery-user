import { TypeId } from '../common'
import { IPaymentStatus } from '../payment'

interface IProductProperties {
  [key: string]: string
}

interface ISimpleUser {
  username: string
  id: string
  email: string
}

export interface IProductDetail {
  id: string
  name: string
  category: string
  properties: IProductProperties
  startPrice: number
  currentPrice: number
  imagePath: string[]
  bidIncrement: number
  bidClosingDate: string
  holder: string
  seller?: ISimpleUser
  description: string
}

export interface IProductComment {
  commentText: string
  createdAt: string
  id: TypeId
  parentCommentId: TypeId | null
  replies?: IProductComment[]
  userName: string
}

export interface IProductCategory {
  id: string
  name: string
  properties: {
    name: string
    type: string
    options?: string[]
  }[]
}

export interface IProductHomePageResponse {
  id: string
  name: string
  startPrice: number
  currentPrice: number
  imagePath: string
  userName: string
  bidClosingDate: Date
  bidCreatingDate: Date
  holder: string
  numberOfBids?: number
}

export interface IWonProduct {
  bidId: TypeId
  bidStartingdate: string
  priceStart: number
  stepBid: number
  priceWin: number
  product: {
    id: TypeId
    name: string
    imagePath: string
    currentPrice: number
    holder: string
    seller?: ISimpleUser
    bidCreatedDate: string
    bidClosingDate: string
    numberOfBids: number
  }
  sellerPaymentStatus?: IPaymentStatus
  winnerPaymentStatus?: IPaymentStatus
}
export type IBidOutCome = 'CLOSED' | 'CLOSED_WITHOUT_WINNER'
export interface IPostedProduct {
  bidId: string
  bidStartingDate: string
  priceStart: number
  stepBid: number
  priceWin: number | null
  product: {
    id: number
    name: string
    startPrice: number
    imagePath: string
    username: string
    bidClosingDate: string
  }
  bidOutCome?: IBidOutCome
  sellerPaymentStatus?: IPaymentStatus
  winnerPaymentStatus?: IPaymentStatus
}

export interface ISellerFeedBacks {
  createdAt?: string
  feedbackText: string
  id: TypeId
  product: IProductDetail
  raring: number
  seller?: ISimpleUser
  winner?: ISimpleUser
}
