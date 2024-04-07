import React, { useEffect } from 'react'

//styles
import PaySuccess from '@/assets/images/PaySuccess.png'
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

interface IEmailSentDialogProps {
  open: boolean
  onClose: () => void
}

const PaidSuccessDailog: React.FC<IEmailSentDialogProps> = props => {
  const { open, onClose } = props

  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, 5000)
  }, [])

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogContent className="max-h-[600px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Thanh toán thành công
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-y-5 justify-center items-center">
            <Image
              src={PaySuccess}
              width={450}
              height={450}
              className="my-auto"
            />
            <p className="text-gray-600 text-sm  text-center">
              Chúng tôi đã nhận được khoản thanh toán của bạn, bạn có thể xác
              nhận tạo sản phẩm ngay bây giờ
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaidSuccessDailog
