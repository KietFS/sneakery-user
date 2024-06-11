import React, { useState } from 'react'

//utils
import { IUserBidHistoryItem } from '@/components/organisms/UserBidHistoryDialog'
import Link from 'next/link'

interface IOrderCardProps {
  order: IUserBidHistoryItem
  handleCloseDialog: () => void
  handlePressCancel: (id: number) => void
}

const OrderCard: React.FC<IOrderCardProps> = props => {
  const { order, handleCloseDialog: handleClostDialog } = props

  return (
    <>
      <button className="rounded-lg border border-gray-200 px-2 w-full py-2 flex flex-col gap-y-5  cursor-pointer hover:opacity-80">
        <div className="flex w-full gap-x-3 items-center">
          <img
            src={order.product.imagePath as string}
            width={120}
            height={80}
          />
          <div className="flex flex-col gap-y-2 w-2/3">
            <Link
              onClick={handleClostDialog}
              href={`/products/${order.product.id}/`}
            >
              <div className="flex gap-x-1 items-center">
                <p className="text-sm text-gray-600 font-semibold">
                  {order.product.name}
                </p>
              </div>
            </Link>
            <div className="flex gap-x-1 items-center">
              <p className="text-xs text-gray-600">
                Mức đặt: {order.amount?.toString().prettyMoney()}$
              </p>
            </div>
            <div className="flex gap-x-1 items-center">
              <p className="text-xs text-gray-600">Vào ngày: </p>
              <div className="rounded-full bg-blue-200 text-blue-800 font-semibold px-[5px] py-[2px] text-[10px] w-fit">
                {order.product.bidClosingDate?.toString().prettyDateTime()}
              </div>
            </div>
            {order.status == 'SUCCESS' && (
              <div className="rounded-full bg-green-200 text-green-800 font-semibold px-[5px] py-[4px] text-[10px] w-fit">
                Thành công
              </div>
            )}
            {order.status == 'REMOVE' && (
              <div className="rounded-full bg-red-100 text-red-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
                Đã bị hủy
              </div>
            )}
            {/* {!!order.status && (
              <div className="rounded-full bg-red-200 text-red-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
                Thất bại
              </div>
            )} */}
          </div>
        </div>
      </button>
    </>
  )
}

export default OrderCard
