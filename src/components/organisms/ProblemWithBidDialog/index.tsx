import React from 'react'

//styles
import EmailSent from '@/assets/images/EmailSent.png'
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

interface IProblemWithBidDialogProps {
  open: boolean
  onClose: () => void
}

const ProblemWithBidDialog: React.FC<IProblemWithBidDialogProps> = props => {
  const { open, onClose } = props

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent className="max-h-[600px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Gặp vấn đề khi ra giá
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="w-full bg-red-600 px-4 rounded-sm py-2 flex items-center">
            <InformationCircleIcon className="w-5 h-5 text-white font-bold" />
            <p className="text-white font-bold text-sm ml-4">
              Người ra giá chú ý
            </p>
          </div>

          <div className="flex flex-col gap-y-5 justify-center">
            <p className="text-gray-600 text-sm">
              Để đảm bảo eBay là một thị trường an toàn, chúng tôi hạn chế số
              lượng sản phẩm mà một tài khoản có thể mua hoặc bán cùng một lúc.
              Những giới hạn này có thể thay đổi theo thời gian và được xác định
              dựa trên hoạt động trước đây của bạn trên trang và hiệu suất
              chung.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Hiện tại, tài khoản của bạn đã đạt đến giới hạn đấu giá và mua
              hàng.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Nếu bạn mua hàng qua trình duyệt web, bạn có thể tăng giới hạn này
              bằng cách cung cấp xác minh bổ sung theo hướng dẫn đã cho.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Nếu bạn mua hàng qua ứng dụng di động, vui lòng thử lại việc mua
              hàng trên trình duyệt web để cung cấp xác minh bổ sung.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProblemWithBidDialog
