import { IBidItem, ITransactionHistoryItem } from '@/types'
import { ClockIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid'
import React from 'react'
import ImagePlaceHolder from '@/assets/images/ImagePlaceholder.jpeg'
import Image from 'next/image'
import BaseImage from '@/components/atoms/Image'

interface ITransactionHistoryCardProps extends ITransactionHistoryItem {}

const TransactionHistoryCard: React.FC<
  ITransactionHistoryCardProps
> = props => {
  const { amount, type, bid, createdAt } = props

  const payStatusLabels = {
    PAID: 'Thanh toán sản phẳm đã thắng',
    POST_SALE_FEE: 'Thanh toán phí đấu giá',
    PRE_SALE_FEE: 'Thanh toán phí đăng sản phẩm',
  }

  return (
    <div className="rounded-lg border border-gray-200 px-4 py-3 flex flex-col gap-y-5 w-full cursor-pointer hover:opacity-80">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4">
          {!!(bid?.product?.imagePath as any) ? (
            <BaseImage
              src={bid?.product?.imagePath as any}
              width={60}
              height={60}
              className="max-w-[60px] max-h-[60px]"
            />
          ) : (
            <Image
              src={ImagePlaceHolder}
              width={60}
              height={60}
              className="max-w-[60px] max-h-[60px]"
            />
          )}
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 font-semibold">
                Tên sản phẩm: {bid?.product?.name || 'Không có tên'}
              </p>
            </div>
            <div className="flex gap-x-1 items-center">
              <div className="items-center flex">
                <p className="text-xs text-gray-500 font-semibold">
                  Số tiền thanh toán:
                </p>
              </div>
              <p className="text-xs text-green-600 font-bold text-xs">
                {amount?.toString().prettyMoney()}$
              </p>
            </div>
            <div className="flex gap-x-1 items-center">
              <div className="items-center flex">
                <p className="text-xs text-gray-500 font-semibold">
                  Thanh toán lúc
                </p>
              </div>
              <p className="text-xs text-gray-600">
                {createdAt?.toString().prettyDateTime()}
              </p>
            </div>
            {type === 'PAID' && (
              <div className="rounded-xl w-fit px-2 py-1 bg-green-100 text-green-500 text-xs font-bold">
                {payStatusLabels['PAID']}
              </div>
            )}
            {type === 'AUCTION_FEE' && (
              <div className="rounded-xl w-fit px-2 py-1 bg-yellow-100 text-yellow-500 text-xs font-bold">
                {payStatusLabels['POST_SALE_FEE']}
              </div>
            )}
            {type === 'PRE_SALE_FEE' && (
              <div className="rounded-xl w-fit px-2 py-1 bg-blue-100 text-blue-500 text-xs font-bold">
                {payStatusLabels['PRE_SALE_FEE']}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistoryCard
