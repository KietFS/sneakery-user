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
import TransactionHistoryCard from '@/components/molecules/TransactionHistoryCard'

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
      setLoading(true)
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
        setTransactionHistoryItem(response?.data?.data)
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
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent className="max-h-[600px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Lịch sử giao dịch của bạn
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8 h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          {loading ? (
            <div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>{' '}
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-5 justify-center items-center">
              {tractionHistoryItem?.map((item, index) => (
                <TransactionHistoryCard {...item} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HistoryDialog
