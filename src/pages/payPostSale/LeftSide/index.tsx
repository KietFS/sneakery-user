import React, { useState } from 'react'

//hooks
import { useAuth } from '@/hooks/useAuth'
import { useAppSelector } from '@/hooks/useRedux'
import { useDispatch } from 'react-redux'

//utils
import axios from 'axios'
import { configResponse, forceLogOut } from '@/utils/request'
import { setMethodSelected } from '@/redux/slices/payment'
import { Config } from '@/config/api'
import { IRootState } from '@/redux'
import { IPayForProductPayload } from '@/types'

//ui
import { Radio } from '@mui/material'
import Button from '@/components/atoms/Button'
import Image from 'next/image'

//images and icons
import PaySuccess from '@/assets/images/PaySuccess.png'
import StripeLogo from '@/assets/images/StripeLogo.png'
import PaypalLogo from '@/assets/images/PayPalLogo.png'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import { IWonProduct } from '@/types/product'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

interface ICheckOutProductLeftSideProps {
  isPaySuccess: boolean
  setIsPaySuccess: (payload: boolean) => void
  postedProduct: any
}

const CheckoutProductLeftSide: React.FC<
  ICheckOutProductLeftSideProps
> = props => {
  const { isPaySuccess, setIsPaySuccess } = props
  const [isPayingPreFee, setIsPayingPreFee] = useState<boolean>(false)
  const { methodSelected } = useAppSelector(
    (state: IRootState) => state.payment,
  )
  const router = useRouter()
  const { accessToken } = useAuth()
  const dispatch = useDispatch()

  //handle press pay, call api via paypal or stripe
  const handlePressPay = async () => {
    try {
      const payload: IPayForProductPayload = {
        amount: Number((props?.postedProduct?.priceWin / 10).toFixed(0)),
        purpose: `Thanh toán phí đấu giá cho sản phẩm đã có người chiến thắng ${props.postedProduct.product.name}`,
      }
      setIsPayingPreFee(true)
      const response = await axios.post(
        `${Config.API_URL}/transactions/${methodSelected}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const { data, isSuccess, error } = configResponse(response)
      if (response?.data?.success) {
        window.open(data.message)
      }
    } catch (error: any) {
      setIsPayingPreFee(false)
      if (error?.response?.status == 401) {
        toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
        forceLogOut()
      }
    }
  }

  const handleSelectPayPal = () => dispatch(setMethodSelected('paypal'))

  const handleSelectStripe = () => dispatch(setMethodSelected('stripe'))

  return (
    <div className="border-gray-200 border p-6  h-full min-h-[500px] w-3/4 rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-600 font-bold text-2xl mb-2">
          Thanh toán sản phẩm
        </h1>
        {/* <Tooltip title="Thay đổi danh mục">
            <IconButton onClick={() => onPressOpenCategory()}>
              <TagIcon className="w-6 h-6 text-gray-500 font-semibold" />
            </IconButton>
          </Tooltip> */}
      </div>
      <p className="text-sm italic text-gray-500">
        *Phiên đấu giá này đã có người chiến thắng, vui lòng thanh toán phí
        chiết khấu đấu giá<br></br>
        Khi nhấn vào nút thanh toán, bạn đã đồng ý với chính sách và điều khoản
        sử dụng của chúng tôi
      </p>

      {/* Main content go here */}

      {isPaySuccess ? (
        <>
          <div className="w-full flex justify-center">
            <Image
              src={PaySuccess}
              className="w-[300px] h-[300px]"
              width={300}
              height={300}
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <CheckBadgeIcon className="text-green-500 font-bold w-5 h-5" />
            <p className="font-semibold text-green-500 ml-2">
              Bạn đã thanh toán phí đấu giá thành công cho sản phẩm{' '}
              {props.postedProduct.product.name}
            </p>
          </div>

          <button
            className="text-blue-500 justify-center w-full text-center text-sm underline font-semibold"
            onClick={() => router.replace('/')}
          >
            Quay về trang chủ
          </button>
        </>
      ) : (
        <div>
          <div className="mt-4">
            <p className="text-xl italic mb-2 text-gray-600 font-bold">
              Phương thức thanh toán
            </p>
            <div className="w-full bg-gray-50 flex items-center px-4 border-t h-[80px]">
              <Radio
                checked={methodSelected === 'paypal'}
                onClick={handleSelectPayPal}
              />
              <div className="flex items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Thanh toán qua Paypal
                </p>
                <Image
                  src={PaypalLogo}
                  width={120}
                  height={80}
                  className="rounded-lg my-auto"
                />
              </div>
            </div>
            <div className="w-full bg-gray-50 flex items-center px-4 border-t h-[80px]">
              <Radio
                checked={methodSelected === 'stripe'}
                onClick={handleSelectStripe}
              />
              <div className="flex items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Thanh toán qua
                </p>
                <Image
                  src={StripeLogo}
                  width={140}
                  height={40}
                  className="rounded-lg my-auto"
                />
              </div>
            </div>
            <div className="w-full bg-gray-50 flex items-center px-8 py-2 border-t h-[60px]">
              <p className="text-sm text-gray-500 italic">
                {methodSelected == 'paypal'
                  ? 'Để hoàn thành giao dịch của bạn, chúng tôi sẽ chuyển bạn qua máy chủ an toàn của PayPal'
                  : 'Để hoàn thành giao dịch của bạn, chúng tôi sẽ chuyển bạn qua máy chủ an toàn của Stripe để thực hiện thanh toán qua các loại thẻ Visa, Mastercard,...'}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <p className="text-lg   text-gray-600 font-bold">Phí giao dịch: </p>
            <p className="text-lg italic font-semibold text-blue-500 ml-1">
              {Number((props?.postedProduct?.priceWin / 10).toFixed(0))
                .toString()
                ?.prettyMoney()}
              $
            </p>
          </div>

          <div className="flex flex-row-reverse">
            <div className="flex items-center">
              <Button
                disable={isPaySuccess}
                title="Thanh toán"
                isLoading={false}
                onClick={handlePressPay}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutProductLeftSide
