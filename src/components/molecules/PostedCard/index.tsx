import React from 'react'
import Image from 'next/image'
import { ClockIcon, PencilIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@mui/material'
import { PaymentSharp } from '@mui/icons-material'

interface IPostedCardProps {
  id: string
  title: string
  status: IPostedStatus
  imagePath: string
  createdAt: string
  onNavigateToEdit: (productId: string) => void
}

type IPostedStatus = 'success' | 'pending'

const PostedCard: React.FC<IPostedCardProps> = props => {
  const { id, title, status, imagePath, createdAt, onNavigateToEdit } = props
  return (
    <div className="rounded-lg border border-gray-200 px-4 py-2 flex flex-col gap-y-5 w-full cursor-pointer hover:opacity-80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <img src={imagePath} width={80} height={60} />
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 font-semibold">
                Tên sản phẩm: {title}
              </p>
            </div>
            <div className="flex gap-x-1 items-center">
              <ClockIcon className="w-4 h-4 text-gray-600" />
              <p className="text-xs text-gray-600">{createdAt}</p>
            </div>
            {status === 'success' && (
              <div className="rounded-full bg-green-200 text-green-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
                Đã kết thúc phiên đấu giá
              </div>
            )}
            {status === 'pending' && (
              <div className="rounded-full bg-yellow-100 text-yellow-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
                Đang đấu giá
              </div>
            )}
          </div>
        </div>
        {status == 'pending' && (
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
        {status == 'success' && (
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
