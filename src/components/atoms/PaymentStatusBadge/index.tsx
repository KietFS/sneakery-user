import { IPaymentStatus } from '@/types'
import React from 'react'

interface IPaymentStatusBadgeProps {
  status: IPaymentStatus
}

const PaymentStatusBadge: React.FC<IPaymentStatusBadgeProps> = props => {
  const { status } = props
  return (
    <>
      {!status && (
        <p className="rounded-full bg-red-100 text-red-800 font-semibold px-[8px] py-[2px] text-[10px] w-fit text-sm">
          Không có thông tin
        </p>
      )}
      {status == 'PENDING' && (
        <p className="rounded-full bg-yellow-100 text-yellow-800 font-semibold px-[8px] py-[2px] text-[10px] w-fit text-sm">
          Đang đợi thanh toán
        </p>
      )}
      {status == 'COMPLETED' && (
        <p className="rounded-full bg-green-100 text-green-800 font-semibold px-[8px] py-[2px] text-[10px] w-fit text-sm">
          Đã thanh toán
        </p>
      )}
      {status == 'OVERDUE' && (
        <p className="rounded-full bg-gray-100 text-gray-800 font-semibold px-[8px] py-[2px] text-[10px] w-fit text-sm">
          Đã hết hạn thanh toán
        </p>
      )}
    </>
  )
}

export default PaymentStatusBadge
