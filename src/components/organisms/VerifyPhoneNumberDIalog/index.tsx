import React, { useEffect, useState } from 'react'

//styles
import { CircularProgress, Dialog, DialogContent, Tooltip } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/20/solid'
import OtpInput from '@/components/atoms/OTPInput'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/common/config/firebase'

interface IVerfiyPhoneNumberDialogProps {
  open: boolean
  onClose: () => void
  onSubmitOTP: (values: string) => void
  buttonLoading: boolean
}

const VerifyPhoneNumberDialog: React.FC<
  IVerfiyPhoneNumberDialogProps
> = props => {
  const { open, onClose, onSubmitOTP, buttonLoading } = props
  const [otpValues, setOtpValues] = useState<string>('')
  const [second, setSecond] = useState<number>(0)

  const handleRegister = () => {
    onSubmitOTP(otpValues)
  }

  useEffect(() => {
    setInterval(() => {
      if (second < 60) {
        let newValue = second + 1
        setSecond(newValue)
      }
    }, 1000)
  }, [])

  const handleResendOTP = async () => {
    // if (second == 60) {
    //   //on resend otp here
    //   setSecond(0)
    //   try {
    //     const recapcha = new RecaptchaVerifier('recaptcha', {}, auth)
    //     const confirmination = await signInWithPhoneNumber(
    //       auth,
    //       values.phoneNumber?.toString().formatPhoneNumber(),
    //       recapcha,
    //     )
    //     if (!!confirmination) {
    //       onSubmitRegisterValues(values)
    //       onSubmitConfirminationValues(confirmination)
    //       setLoading(false)
    //     }
    //   } catch (error) {
    //     console.log('send otp error', error)
    //     setLoading(false)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
  }

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
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-gray-600 font-bold text-2xl mb-2">
                Vui lòng xác nhận số điện thoại của bạn
              </h1>
              <Tooltip onClick={() => onClose()} title="Đóng">
                <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
              </Tooltip>
            </div>
            <p className="text-gray-500 italic text-sm">
              Chúng tôi vừa gửi một mã OTP gồm 6 chữ số đến số điện thoại của
              bạn, vui lòng nhập vào để xác nhận số điện thoại
            </p>
          </div>

          <OtpInput onChangeValue={values => setOtpValues(values)} />

          <div className="flex items-center">
            <p className="text-gray-500 text-md italic ">
              Không nhận được mã ?
            </p>
            <button onClick={handleResendOTP}>
              <p className="text-blue-500 font-bold italic text-md ml-1 underline">
                Gửi lại mã
              </p>
            </button>
            <button>
              <p className="text-gray-500 italic text-md ml-1">
                {' '}
                sau {60 - second} giây
              </p>
            </button>
          </div>

          <div className="flex justify-between mt-8">
            <button></button>
            <button
              onClick={handleRegister}
              className="bg-blue-500 font-bold text-white py-1 rounded-lg w-40 h-12 min-w-[200px]"
            >
              {buttonLoading ? (
                <CircularProgress sx={{ color: 'white' }} size={20} />
              ) : (
                'Đăng ký'
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VerifyPhoneNumberDialog
