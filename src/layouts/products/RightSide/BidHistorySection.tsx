import React, { useEffect, useState } from 'react'
import { IProductBidHistoryItem } from '.'
import ProductBidHistoryDialog from '@/components/templates/ProductBidHistoryDialog'
import axios from 'axios'
import { Config } from '@/config/api'
import { IProductDetail } from '@/types'

interface IBidHistorySectionProps {
  product: IProductDetail
  bidHistory: IProductBidHistoryItem[]
}

const BidHistorySection: React.FC<IBidHistorySectionProps> = ({
  product,
  bidHistory,
}) => {
  const [openHistoryDialog, setOpenHistoryDialog] =
    React.useState<boolean>(false)

  return (
    <>
      <div className="mt-4 max-w-[90%]">
        <h3 className="text-gray-400 text-lg leading-0">
          Các lượt bid gần đây :{' '}
        </h3>
        <div className="flex flex-col gap-y-2 mt-2 w-fit">
          {bidHistory.map((item, index) => {
            if (index <= 2)
              return (
                <div
                  className="flex justify-between items-center"
                  key={index.toString()}
                >
                  <p className="text-gray-500 text-sm cursor-pointer italic mr-1">
                    {item.userName} -
                  </p>
                  <p className="text-blue-500 font-bold text-sm cursor-pointer mr-1 ">
                    {item.bidAmount.toString().prettyMoney()}$ -
                  </p>
                  <p className="text-gray-600 text-sm cursor-pointer">
                    {item.createdAt.toString()?.prettyDateTime()}
                  </p>
                </div>
              )
          })}
        </div>
        <p
          className="text-sm font-semibold px-4 py-1 bg-blue-200 text-blue-900 w-fit rounded-full mt-4 cursor-pointer hover:opacity-80"
          onClick={() => setOpenHistoryDialog(true)}
        >
          Xem thêm
        </p>
      </div>
      {openHistoryDialog ? (
        <ProductBidHistoryDialog
          open={openHistoryDialog}
          onClose={() => {
            setOpenHistoryDialog(false)
          }}
          bidHistory={bidHistory}
          product={product}
        />
      ) : null}
    </>
  )
}

export default BidHistorySection
