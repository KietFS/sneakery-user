import { TypeId } from '../common'

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
