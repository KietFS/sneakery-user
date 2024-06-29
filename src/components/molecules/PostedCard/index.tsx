import React from 'react'
import {
  ClockIcon,
  EyeDropperIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import { IPostedProduct } from '@/types'
import {
  EyeSlashIcon,
  InformationCircleIcon,
  EyeIcon,
} from '@heroicons/react/20/solid'
import SellerPaymentStatusBadge from '@/components/atoms/SellerPaymentStatusBadge'
import { IconButton } from '@mui/material'
import { PaymentSharp } from '@mui/icons-material'

interface IPostedCardProps extends IPostedProduct {
  id: string
  title: string
  status: IPostedStatus
  imagePath: string
  createdAt: string
  onNavigateToPayment: (productId: string) => void
}

type IPostedStatus = 'success' | 'pending'

const PostedCard: React.FC<IPostedCardProps> = props => {
  const {
    id,
    title,
    bidOutCome,
    sellerPaymentStatus,
    winnerPaymentStatus,
    imagePath,
    createdAt,
    onNavigateToPayment,
  } = props
  const [isShowWinnerInfo, setIsShowWinnerInfo] = React.useState<boolean>(false)

  console.log('PROPS IS', props)

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
              <p className="text-xs text-gray-600 font-semibold">
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
              <p className="text-xs font-regular text-gray-600">
                {props.product.bidClosingDate?.toString().prettyDateTime()}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-500 font-regular text-xs mr-1">
                Trạng thái:{' '}
              </p>
              {bidOutCome == 'CLOSED_WITHOUT_WINNER' && (
                <p className="text-xs font-regular text-red-500 font-regular">
                  Phiên đấu giá đã kết thúc, không có người chiến thắng
                </p>
              )}
              {bidOutCome == 'CLOSED' && (
                <p className="text-xs font-regular text-green-500 font-regular">
                  Phiên đấu giá đã kết thúc, có người chiến thắng
                </p>
              )}
              {bidOutCome == 'OPEN' && (
                <p className="text-xs font-regular text-gray-700 font-regular">
                  Phiên đấu giá đang diễn ra
                </p>
              )}
            </div>

            <div className="flex items-center">
              <p className="text-xs text-gray-500 font-regular mr-1">
                Trạng thái thanh toán:
              </p>
              {sellerPaymentStatus !== undefined ? (
                <SellerPaymentStatusBadge status={sellerPaymentStatus} />
              ) : (
                <p className="text-gray-600 font-regular text-xs">Không rõ</p>
              )}
            </div>
            {sellerPaymentStatus == 'COMPLETED' && (
              <>
                <button
                  className="flex items-center"
                  onClick={() => setIsShowWinnerInfo(!isShowWinnerInfo)}
                >
                  {isShowWinnerInfo ? (
                    <EyeSlashIcon
                      className="text-gray-500 mr-2"
                      width={20}
                      height={20}
                    ></EyeSlashIcon>
                  ) : (
                    <EyeIcon
                      className="text-gray-500 mr-2"
                      width={20}
                      height={20}
                    />
                  )}

                  <p className="text-gray-600 font-regular text-xs">
                    {isShowWinnerInfo
                      ? 'Ẩn thông tin người chiến thắng'
                      : 'Xem thông tin người chiến thắng'}
                  </p>
                </button>

                {isShowWinnerInfo && (
                  <div className="grid grid-cols-2 gap-x-1 gap-y-2 w-[300px]">
                    <p className="text-gray-600 font-semibold text-xs">
                      Tên người chiến thắng:
                    </p>
                    <p className="text-gray-500 font-semibold text-xs">
                      Đoàn Chấn Hưng
                    </p>
                    <p className="text-gray-600 font-semibold text-xs">
                      Số điện thoại:
                    </p>
                    <p className="text-gray-500 font-semibold text-xs">
                      0818 123 456
                    </p>
                    <p className="text-gray-600 font-semibold text-xs">
                      Email:
                    </p>
                    <p className="text-gray-500 font-semibold text-xs">
                      hungdoan@gmail.com
                    </p>
                  </div>
                )}
              </>
            )}

            {sellerPaymentStatus == 'PENDING' && (
              <div className="flex items-center">
                <InformationCircleIcon
                  width={15}
                  height={15}
                  className="text-yellow-600 font-semibold mr-2"
                />
                <p className="text-xs font-regular text-yellow-600">
                  Vui lòng thanh toán phí đấu giá để xem thông tin đầy đủ về
                  người chiến thắng
                </p>
              </div>
            )}
          </div>
        </div>

        {sellerPaymentStatus == 'PENDING' && (
          <IconButton
            title="Thanh toán phí đấu giá"
            onClick={() => onNavigateToPayment(id)}
          >
            <PaymentSharp width={20} height={20} className="text-green-500" />
          </IconButton>
        )}
      </div>
    </div>
  )
}

export default PostedCard
