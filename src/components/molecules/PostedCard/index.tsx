import React from 'react'
import Image from 'next/image'
import { ClockIcon, PencilIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@mui/material'
import { PaymentSharp } from '@mui/icons-material'
import { IPostedProduct } from '@/types'
import PaymentStatusBadge from '@/components/atoms/PaymentStatusBadge'

interface IPostedCardProps extends IPostedProduct {
  id: string
  title: string
  status: IPostedStatus
  imagePath: string
  createdAt: string
  onNavigateToEdit: (productId: string) => void
}

type IPostedStatus = 'success' | 'pending'

const PostedCard: React.FC<IPostedCardProps> = props => {
  const {
    id,
    title,
    status,
    sellerPaymentStatus,
    winnerPaymentStatus,
    imagePath,
    createdAt,
    onNavigateToEdit,
  } = props

  return (
    <div className="rounded-lg border border-gray-200 px-4 py-2 flex flex-col gap-y-5 w-full cursor-pointer hover:opacity-80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <img
            src={imagePath}
            width={80}
            height={60}
            className="max-h-[80px] max-w-[80px]"
          />
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 font-regular">
                Tên sản phẩm: {title}
              </p>
            </div>
            <div className="flex gap-x-1 items-center">
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 text-gray-600 mr-1" />
                <p className="text-gray-500 font-regular text-xs">
                  Thời điểm kết thúc đấu giá:
                </p>
              </div>
              <p className="text-xs font-regular text-gray-600">{createdAt}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-500 font-regular text-xs mr-1">
                Trạng thái:{' '}
              </p>
              {status === 'success' && (
                <p className="text-xs font-regular text-gray-500">
                  Phiên đấu giá đã kết thúc
                </p>
              )}
              {status === 'pending' && (
                <p className="text-xs font-regular text-blue-500">
                  Phiên đấu giá đang diễn ra
                </p>
              )}
            </div>

            <div className="flex items-center">
              <p className="text-xs text-gray-500 font-regular mr-1">
                Trạng thái thanh toán:
              </p>
              {sellerPaymentStatus !== undefined ? (
                <PaymentStatusBadge status={sellerPaymentStatus} />
              ) : (
                <p className="text-gray-600 font-regular text-xs">Không rõ</p>
              )}
            </div>
          </div>
        </div>
        {sellerPaymentStatus == 'COMPLETED' && (
          <IconButton
            title="Chỉnh sửa sản phẩm"
            onClick={() => onNavigateToEdit(id)}
          >
            <PencilIcon
              width={15}
              height={15}
              className="w-[10] h-[10] text-gray-600"
            />
          </IconButton>
        )}
        {sellerPaymentStatus == 'PENDING' && (
          <IconButton
            title="Thanh toán phí đấu giá"
            onClick={() => onNavigateToEdit(id)}
          >
            <PaymentSharp width={20} height={20} className="text-green-500" />
          </IconButton>
        )}
      </div>
    </div>
  )
}

export default PostedCard
