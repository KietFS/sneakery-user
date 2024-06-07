import React from 'react'

//styles
import EmailSent from '@/assets/images/EmailSent.png'
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { TypeId } from '@/types'
import { FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import RichTextInput from '@/components/atoms/RichTextInput'
import { useForm } from 'react-hook-form'
import Button from '@/components/atoms/Button'
import axios from 'axios'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import { configResponse } from '@/utils/request'

interface IFeedBackDialog {
  open: boolean
  onClose: () => void
  sellerId: TypeId
  productId: TypeId
}

const FeedBackDialog: React.FC<IFeedBackDialog> = props => {
  const { open, onClose, productId } = props
  const { control, handleSubmit } = useForm()
  const [rateSelected, setRateSelected] = React.useState<number>(0)
  const { accessToken } = useAuth()
  const [isRating, setIsRating] = React.useState<boolean>(false)

  const ratesPoints = [
    {
      id: 1,
      value: 1,
      label: 'Hài lòng',
      textColor: 'text-green-500',
      borderColor: 'border-green-500',
    },
    {
      id: 0,
      value: 0,
      label: 'Không hài lòng',
      textColor: 'text-red-500',
      borderColor: 'border-red-500',
    },
  ]

  const handleRateSeller = async (values: any) => {
    try {
      setIsRating(true)
      const response = await axios.post(
        `${Config.API_URL}/feedbacks`,
        {
          feedbackText: values.feedbackText,
          productId: productId,
          rating: rateSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const { data, isSuccess } = configResponse(response)
      if (isSuccess) {
        setIsRating(false)
        toast.success('Đánh giá thành công')
        onClose()
      } else {
        setIsRating(false)
        toast.error('Đánh giá không thành công')
      }
    } catch (error) {
      setIsRating(false)
      toast.error('Đánh giá không thành công')
    } finally {
      setIsRating(false)
    }
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogContent className="min-h-[300px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Để lại đánh giá cho người bán
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8 h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-y-5 justify-center items-center">
            <div className="flex gap-x-2 justify-center">
              {ratesPoints.map(rate => (
                <button
                  onClick={() => setRateSelected(rate.id)}
                  className={` flex items-center hover:opacity-60 gap-x-2 bg-white px-4 py-2 min-w-[180px] rounded-xl ${
                    rateSelected == rate.id ? 'border-2' : 'border'
                  } ${rate.borderColor} ${rate.textColor} `}
                >
                  {rate.id == 1 ? (
                    <FaceSmileIcon className="w-6 h-6 text-green-500" />
                  ) : (
                    <FaceFrownIcon className="w-6 h-6 text-red-500" />
                  )}
                  <div
                    className={`${rate.textColor} text-md text-center w-full`}
                  >
                    {rate.label}
                  </div>
                </button>
              ))}
            </div>

            <RichTextInput
              control={control}
              name="feedbackText"
              label="Đánh giá chi tiết"
              placeholder="Ghi vào đây đánh giá chi tiết của bạn"
            />
          </div>

          <div className="flex flex-row-reverse gap-x-2">
            <Button title="Đồng ý" onClick={handleSubmit(handleRateSeller)} />
            <Button
              onClick={onClose}
              title="Hủy bỏ"
              variant="secondary"
              isLoading={isRating}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeedBackDialog
