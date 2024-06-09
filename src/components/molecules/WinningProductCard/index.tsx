import PaymentStatusBadge from '@/components/atoms/PaymentStatusBadge'
import SmallCountdownTimer from '@/components/atoms/SmallCountdownTimer'
import FeedBackDialog from '@/components/organisms/FeedBackDialog'
import { IWonProduct } from '@/types'
import { ClockIcon, PlusCircleIcon, StarIcon } from '@heroicons/react/20/solid'
import { PaymentSharp, PaymentsSharp } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

interface IWinningProductCardProps {
  item: IWonProduct
  handlePressCheckout: (item: IWonProduct) => void
}

const WinningProductCard: React.FC<IWinningProductCardProps> = props => {
  const { item, handlePressCheckout } = props

  //local state
  const [openFeedBackDialog, setOpenFeedBackDialog] =
    React.useState<boolean>(false)

  const bidClosingDate = new Date(item.product.bidClosingDate)
  const paymentRemainTimeDeadline = new Date(bidClosingDate)
  paymentRemainTimeDeadline.setHours(bidClosingDate.getHours() + 24)

  return (
    <>
      <div className="rounded-lg border border-gray-200 px-4 py-2 flex flex-col gap-y-5 w-full cursor-pointer hover:opacity-80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <img
              src={item.product.imagePath}
              width={80}
              height={60}
              className="max-h-[80px] max-w-[80px]"
            />
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center">
                <p className="text-xs text-gray-600 font-regular">
                  Tên sản phẩm: {item?.product?.name}
                </p>
              </div>
              <div className="flex gap-x-1 items-center">
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 text-gray-600 mr-1" />
                  <p className="text-gray-500 font-regular text-xs">
                    Thời điểm kết thúc đấu giá:
                  </p>
                </div>
                <p className="text-xs font-regular text-gray-600">
                  {item?.product?.bidClosingDate?.toString()?.prettyDateTime()}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-500 font-regular text-xs mr-1">
                  Giá chiến thắng:
                </p>
                <p className="text-xs font-regular text-green-600">
                  {item?.priceWin?.toString().prettyMoney()}$
                </p>
              </div>

              <div className="flex items-center">
                <p className="text-xs text-gray-500 font-regular mr-1">
                  Trạng thái thanh toán:
                </p>
                {item.winnerPaymentStatus !== undefined ? (
                  <PaymentStatusBadge status={item.winnerPaymentStatus} />
                ) : (
                  <p className="text-gray-600 font-regular text-xs">Không rõ</p>
                )}
              </div>
            </div>
          </div>
          {item.winnerPaymentStatus == 'PENDING' && (
            <IconButton
              title="Thanh toán sản phẩm"
              onClick={() => handlePressCheckout(item)}
            >
              <PaymentSharp width={20} height={20} className="text-green-500" />
            </IconButton>
          )}

          {item?.winnerPaymentStatus == 'COMPLETED' && (
            <IconButton
              title="Đánh giá sản phẩm"
              onClick={() => setOpenFeedBackDialog(true)}
            >
              <StarIcon
                width={25}
                height={25}
                className="text-gray-500 hover:text-yellow-500"
              />
            </IconButton>
          )}
        </div>
      </div>

      {openFeedBackDialog && (
        <FeedBackDialog
          sellerId={item.product?.seller?.id as string}
          open={openFeedBackDialog}
          productId={item?.product?.id}
          onClose={() => setOpenFeedBackDialog(false)}
        />
      )}
    </>
  )
}

export default WinningProductCard
