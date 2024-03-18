import React, { useEffect, useState } from 'react'

//styles
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/20/solid'

//utils
import { IProductBidHistoryItem } from '@/containers/products/RightSide'
import axios from 'axios'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import { TrashIcon } from '@heroicons/react/24/outline'
import ConfirmDialog from '../ConfirmDialog'
import { toast } from 'react-toastify'

interface IProductBidHistoryDialogProps {
  onClose: () => void
  open: boolean
  bidHistory: IProductBidHistoryItem[]
  product: IProductDetail
}

const ProductBidHistoryDialog: React.FC<
  IProductBidHistoryDialogProps
> = props => {
  const { product, bidHistory } = props
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const [orderSelected, setOrderSelected] = useState<string | number>('')
  const [items, setItems] = useState<IProductBidHistoryItem[]>(props.bidHistory)
  const { user } = useAuth()

  const cancelBid = async () => {
    try {
      setActionLoading(true)
      const response = await axios.delete(
        `${Config.API_URL}/bid-history/${orderSelected}`,
      )

      if (response?.data?.success == true) {
        toast.success(response?.data?.message)
        setActionLoading(false)
        let clones = items
        clones?.forEach((clone, cloneIndex) => {
          if (clone.bidHistoryId == orderSelected) {
            clone.status = 'REMOVE'
          }
        })
        setItems([...clones])
        props.onClose()
      }
    } catch (error) {
      setActionLoading(false)
      console.log('ERROR', error)
    }
  }

  useEffect(() => {
    if (bidHistory?.length > 0) {
      setItems(bidHistory)
    }
  }, [bidHistory])

  return (
    <>
      <Dialog
        onClose={props.onClose}
        open={props.open}
        className="rounded-lg"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogContent className="max-h-[600px]">
          <div className="flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-600 font-bold text-2xl mb-2">
                Lịch sử đấu giá của sản phẩm
              </h1>
              <Tooltip onClick={props.onClose} title="Đóng">
                <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
              </Tooltip>
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-200  justify-between">
                <p className="text-gray-600 text-sm cursor-pointer w-1/5">
                  Người ra giá
                </p>
                <p className="text-gray-600 text-sm cursor-pointer w-1/5">
                  Mức ra giá
                </p>
                <p className="text-gray-600 text-sm cursor-pointer w-1/5">
                  Ngày
                </p>
                <p className="text-gray-600 text-sm cursor-pointer w-1/5">
                  Trạng thái
                </p>
                <p className="text-gray-600 text-sm cursor-pointer w-1/5 text-center">
                  Hành động
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              {items?.map((item, index) => (
                <div
                  className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-lg justify-between"
                  key={index.toString()}
                >
                  <p className="text-lg text-gray-500 font-bold w-1/5">
                    {item.userName}
                  </p>
                  <p className="text-blue-500 font-bold text-sm cursor-pointer mr-1 w-1/5">
                    {item.bidAmount.toString().prettyMoney()}$
                  </p>
                  <p className="text-gray-600 text-sm cursor-pointer w-1/5">
                    {item.createdAt.toString().replace('T', ' ')}
                  </p>
                  <div className=" w-1/5">
                    {item.status == 'SUCCESS' && (
                      <div className="rounded-full bg-green-200 text-green-800 font-semibold px-[10px] py-[4px] text-[12px] w-fit">
                        Thành công
                      </div>
                    )}
                    {item.status == 'REMOVE' && (
                      <div className="rounded-full bg-red-100 text-red-800 font-semibold px-[10px] py-[4px] text-[12px] w-fit">
                        Đã bị hủy
                      </div>
                    )}
                  </div>
                  <div className="w-1/5 flex justify-between">
                    <div></div>
                    {item.userName == user.username &&
                    item.status == 'SUCCESS' ? (
                      <Tooltip title="Hủy lượt đấu giá">
                        <IconButton
                          onClick={() => {
                            setOpenConfirmDialog(true)
                            setOrderSelected(item.bidHistoryId)
                          }}
                        >
                          <XMarkIcon width={20} height={20} />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={openConfirmDialog}
        title="Bạn có chắc muốn hủy lượt đấu giá cho sản phẩm này"
        description="Hành động này không thể quay lại"
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={cancelBid}
        isConfirmLoadingButton={actionLoading}
      />
    </>
  )
}

export default ProductBidHistoryDialog
