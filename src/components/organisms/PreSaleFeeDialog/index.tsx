import React, { useEffect } from 'react'

//styles
import PaySuccess from '@/assets/images/PaySuccess.png'
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

interface IPreSaleFeeDialog {
  open: boolean
  onClose: () => void
}

const PreSaleFeeDialog: React.FC<IPreSaleFeeDialog> = props => {
  const { open, onClose } = props

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogContent className="max-h-[900px]">
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

export default PreSaleFeeDialog
