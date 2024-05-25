import PaymentStatusBadge from '@/components/atoms/PaymentStatusBadge'
import SmallCountdownTimer from '@/components/atoms/SmallCountdownTimer'
import { IWonProduct } from '@/types'
import { PaymentsSharp } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

interface IWinningProductCardProps {
  item: IWonProduct
  handlePressCheckout: (item: IWonProduct) => void
}

const WinningProductCard: React.FC<IWinningProductCardProps> = props => {
  const { item, handlePressCheckout } = props

  const bidClosingDate = new Date(item.product.bidClosingDate)
  const paymentRemainTimeDeadline = new Date(bidClosingDate)
  paymentRemainTimeDeadline.setHours(bidClosingDate.getHours() + 24)

  return (
    <div className="flex w-full gap-x-4 items-center">
      <img
        src={item.product.imagePath as string}
        width={80}
        height={60}
        className="max-h-[60px] max-w-[80px]"
      />
      <div className="flex flex-col gap-y-2 w-2/3">
        <div className="flex gap-x-1 items-center">
          <p className="text-sm text-gray-600 font-semibold">
            {item.product.name}
          </p>
        </div>

        <div className="flex gap-x-1 items-center">
          <p className="text-xs text-gray-500 font-semibold">Giá cuối cùng: </p>
          <p className="text-green-500 font-semibold text-xs">
            {item.priceWin?.toString().prettyMoney()}$
          </p>
        </div>
        <div className="flex gap-x-1 items-center">
          <p className="text-xs text-gray-500 font-semibold">
            Số lượt đấu giá: {item?.product?.numberOfBids}
          </p>
        </div>
        <div className="flex gap-x-1 items-center">
          <p className="text-xs text-gray-500 font-semibold">Trạng thái:</p>
        </div>
        <div className="flex gap-x-1 items-center">
          <p className="text-xs text-gray-500 font-semibold">
            Thời gian còn lại để thanh toán:
          </p>
          <SmallCountdownTimer bidClosingDate={paymentRemainTimeDeadline.toString()} />
        </div>
        {item.winnerPaymentStatus && (
          <PaymentStatusBadge status={item.winnerPaymentStatus} />
        )}
      </div>
      {item.winnerPaymentStatus === 'PENDING' && (
        <Tooltip title="Thanh toán">
          <IconButton onClick={() => handlePressCheckout(item)}>
            <PaymentsSharp width={20} height={20} className="text-green-500" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  )
}

export default WinningProductCard
