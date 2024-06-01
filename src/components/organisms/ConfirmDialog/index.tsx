import React from 'react'

//styles
import Button from '@/components/atoms/Button'
import { Dialog, DialogContent } from '@mui/material'

interface IConfirmDialogProps {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
  isConfirmLoadingButton?: boolean
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = props => {
  const {
    open,
    onClose,
    onConfirm,
    title,
    description,
    isConfirmLoadingButton,
  } = props
  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="lg"
      fullWidth={false}
    >
      <DialogContent className="max-h-[600px]">
        <h1 className="text-gray-600 font-bold text-xl mb-2 ">{title}</h1>
        <p className="text-gray-500  text-xs mb-2">{description}</p>
        <div className="flex justify-between">
          <div></div>

          <div className="flex gap-x-2 mt-5">
            <Button variant="secondary" title="Đóng" onClick={onClose} />
            <Button
              variant="primary"
              title="Xác nhận"
              onClick={onConfirm}
              isLoading={isConfirmLoadingButton}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
