import { TypeId } from '../common'

interface IProductProperties {
  [key: string]: string
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
  description: string
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
    bidCreatedDate: string
    bidClosingDate: string
    numberOfBids: number
  }
}
