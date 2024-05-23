import { IBidItem, ITransactionHistoryItem } from '@/types'
import React from 'react'

interface ITransactionHistoryCardProps extends ITransactionHistoryItem {}

const TransactionHistoryCard: React.FC<
  ITransactionHistoryCardProps
> = props => {
  const { amount, type, bid } = props
  const { bidId, product } = bid as IBidItem

  return <div></div>
}

export default TransactionHistoryCard
