declare module '@heroicons/react/outline'

interface IProductProperties {
  [key: string]: string
}

interface IProductDetail {
  id: string
  name: string
  category: string
  properties: IProductProperties
  startPrice: number
  currentPrice: number
  imagePath: string[]
  bidIncrement: number
  bidClosingDate: string
}

interface IProductCategory {
  id: string
  name: string
  properties: {
    name: string
    type: string
    options?: string[]
  }[]
}

interface IProductHomePageResponse {
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

declare interface String {
  truncate: (num: number) => string
}

declare interface String {
  prettyMoney: () => string
  prettyDate: () => string
  prettyDateTime: () => string
}

declare interface Array<T> {
  has: (item: T) => boolean
}
