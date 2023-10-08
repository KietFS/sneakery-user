import React, { useState } from 'react'

//styles
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import Spinner from '@/components/Spinner'
import { XMarkIcon } from '@heroicons/react/20/solid'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils
import { NumericFormat } from 'react-number-format'
import { toast } from 'react-toastify'
import axios from 'axios'
import { IRootState } from '@/redux'

interface IWalletDialogProps {
  open: boolean
  onClose: () => void
}

interface ITransactionHistory {
  amount: number
  status: string
  transactedAt: string
  transactionCode: number
}

const WithDrawDialog: React.FC<IWalletDialogProps> = props => {
  const { open, onClose } = props
  const { user, balance } = useAppSelector((state: IRootState) => state.auth)
  const [loading, setLoading] = useState<boolean>(false)
  const [chargeAmount, setChargeAmount] = useState<string | null>(null)

  const withDraw = async () => {
    if (Number(chargeAmount?.split(',').join('')) > balance) {
      toast.error('Tài khoản của bạn không đủ để thực hiện')
    } else {
      try {
        setLoading(true)
        const data = await axios.get(
          `https://sneakery.herokuapp.com/api/transaction/withdraw?amount=${chargeAmount
            ?.split(',')
            .join('')}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          },
        )
        if (data) {
          console.log('CHARGE DATA', data)
          toast.success('Rút tiền thành công')
        }
      } catch (error) {
        console.log('CHARGE ERROR', error)
        toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
      } finally {
        setLoading(false)
      }
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
      <DialogContent className="max-h-[600px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl">Rút tiền</h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8 h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full text-white text-[60px] text-center items-center flex justify-center font-semibold">
              {user?.username?.[0].toUpperCase()}
            </div>
            <p className="text-gray-600 font-semibold text-xl mt-2">
              {user?.username}
            </p>
            <>
              {loading ? (
                <div className="mt-2">
                  <Spinner size={20} />
                </div>
              ) : (
                <>
                  {' '}
                  <NumericFormat
                    placeholder="Nhập số tiền"
                    allowLeadingZeros
                    thousandSeparator=","
                    onChange={e => setChargeAmount(e.target.value)}
                    type="text"
                    className={`bg-gray-100 text-gray-700  w-[200px] my-2 h-8 px-2 text-sm ml-1 outline-none ring-0 outline-transparent border-transparent focus:border-transparent focus:ring-0 focus:outline-transparent focus:bg-blue-50 rounded-lg`}
                  />
                  <p
                    className="text-sm font-semibold px-4 py-1 bg-blue-500 text-white rounded-full mt-3 cursor-pointer hover:opacity-80"
                    onClick={() => {
                      withDraw()
                    }}
                  >
                    Rút tiền về
                  </p>{' '}
                </>
              )}
            </>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WithDrawDialog
