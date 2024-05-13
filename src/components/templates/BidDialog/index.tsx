import * as React from 'react'

//styles
import InputBid from '@/components/atoms/InputNumber'
import Button from '@/components/atoms/Button'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//store
import { IRootState } from '@/redux'

//utils
import axios from 'axios'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'
import { useDispatch } from 'react-redux'
import { setUserBalance } from '@/redux/slices/auth'
import { useAuth } from '@/hooks/useAuth'
import { IActionResponseData, IProductDetail } from '@/types'

interface IFormValue {
  amount?: string
}

export interface IBidDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  onProblemWithBid: () => void
  product: IProductDetail
}

function BidDialog(props: IBidDialogProps) {
  const { open, onClose, product, onSuccess, onProblemWithBid } = props
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    amount: (product.currentPrice + product.bidIncrement).toString(),
  })
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({})
  const { accessToken } = useAuth()

  React.useEffect(() => {
    if (!!product) {
      setInitialValues({
        amount: (product.currentPrice + product.bidIncrement).toString(),
      })
    }
  }, [product])

  const handleSubmit = async (values: IFormValue) => {
    if (
      Number(values?.amount?.split(',').join('')) <
      Number(product.currentPrice + product.bidIncrement)
    ) {
      setError('Vui lòng nhập bid cao hơn mức bid hiện tại cộng với bước giá !')
    } else {
      try {
        setLoading(true)
        const response = await axios.post(
          `${Config.API_URL}/bids/place`,
          {
            amount: Number(values.amount?.split(',').join('')),
            productId: Number(product.id),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        const data = response?.data as IActionResponseData
        if (data?.success) {
          toast.success('Bid sản phẩm thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          onSuccess()
          onClose()
        } else if (data?.success == false) {
          //handle if this is a ghost bid
          if (data?.status == 'ghost') {
          } else {
            toast.error(
              data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau',
              {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              },
            )
          }
          onClose()
        }
      } catch (error) {
        toast.error((error as any)?.response?.data?.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        console.log(error)
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
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ submitForm, values, handleSubmit }) => {
            return (
              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-5">
                  <div className="w-full flex items-center">
                    <h1 className="text-gray-600 font-bold text-2xl">
                      Nhập thông tin đấu giá của bạn
                    </h1>
                  </div>
                  <InputBid
                    name="amount"
                    value={initialValues?.amount}
                    label="Mức ra giá của bạn"
                    placeholder="Nhập mức ra giá của bạn"
                    bidError={error}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div></div>
                  <div className="flex items-center">
                    <Button
                      variant="secondary"
                      onClick={() => onClose()}
                      title="Đóng"
                    />
                    <Button
                      type="submit"
                      title="Xác nhận"
                      variant="primary"
                      className="ml-2"
                      isLoading={loading}
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default BidDialog
