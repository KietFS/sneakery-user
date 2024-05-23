import React, { useEffect, useState } from 'react'

//styles
import EmailSent from '@/assets/images/EmailSent.png'
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { ITransactionHistoryItem } from '@/types'
import axios from 'axios'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'

interface IHistoryDialogProps {
  open: boolean
  onClose: () => void
}

const HistoryDialog: React.FC<IHistoryDialogProps> = props => {
  const { open, onClose } = props
  const [tractionHistoryItem, setTransactionHistoryItem] = useState<
    ITransactionHistoryItem[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const getTransactionHistoryItems = async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/transactions/user-history`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response?.data?.success) {
        setLoading(false)
        setTransactionHistoryItem(response?.data?.results)
      } else {
        setTransactionHistoryItem([])
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTransactionHistoryItems()
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
              Lịch sử giao dịch của bạn
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-y-5 justify-center items-center">
            <Image
              src={EmailSent}
              width={450}
              height={450}
              className="my-auto"
            />
            <p className="text-gray-600 text-sm  text-center">
              Chúng tôi vừa gửi một đường link tới email của bạn, hãy nhấn vào
              đường link để hoàn thành thủ tục đăng ký của chúng tôi
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HistoryDialog
