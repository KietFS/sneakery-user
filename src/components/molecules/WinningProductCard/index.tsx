import PaymentStatusBadge from '@/components/atoms/PaymentStatusBadge'
import SmallCountdownTimer from '@/components/atoms/SmallCountdownTimer'
import FeedBackDialog from '@/components/organisms/FeedBackDialog'
import { IWonProduct } from '@/types'
import {
  ClockIcon,
  InformationCircleIcon,
  PlusCircleIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
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

  console.log('item is', item)

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
                <p className="text-smtext-gray-600 font-semibold">
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
                  Giá khởi điểm của sản phẩm:
                </p>
                <p className="text-xs font-semibold text-gray-600">
                  {item?.priceStart?.toString().prettyMoney()}$
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
                <InformationCircleIcon
                  width={15}
                  height={15}
                  className="text-yellow-600 font-semibold mr-2"
                />
                <p className="text-xs font-regular text-yellow-600">
                  Người đăng sẽ liên lạc với bạn để hoàn tất giao dịch
                </p>
              </div>
            </div>
          </div>

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
