export type TypeId = string | number

export interface IListResponse<T = any> {
  success: boolean
  message: string
  data: T[]
  _page: number
  _limit: number
  _totalRecords: number
  _totalPage: number
}
