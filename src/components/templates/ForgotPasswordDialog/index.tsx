import {
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import ForgotPassword from '@/assets/images/ForgotPassword.png'
import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/common/config/firebase'
import { useForm } from 'react-hook-form'
import InputHookForm from '@/components/atoms/InputHookForm'
import { regexes } from '@/utils/regex'
import { useDispatch } from 'react-redux'
import OtpInput from '@/components/atoms/OTPInput'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import { Config } from '@/config/api'

interface IFormValue {
  email: string
  password: string
}

interface IForgotPasswordDialogProps {
  isOpen: boolean
  onclickClose: () => void
}

type ScreenMode = 'OTP' | 'phoneNumber' | 'resetPassword'

const ForgotPasswordDialog: React.FC<IForgotPasswordDialogProps> = props => {
  const { isOpen, onclickClose } = props
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [confirmination, setConfirmination] = useState<any>()
  const dispatch = useDispatch()
  const [mode, setMode] = useState<ScreenMode>('phoneNumber')
  const [otpValues, setOtpValues] = useState<string>('')
  const [verifyOTPLoading, setVerifyOTPLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const handleSendOTP = async (values: any) => {
    try {
      const recapcha = new RecaptchaVerifier('recaptcha', {}, auth)
      const confirmination = await signInWithPhoneNumber(
        auth,
        values.phoneNumber?.toString().formatPhoneNumber(),
        recapcha,
      )
      if (!!confirmination) {
        setMode('OTP')
        setConfirmination(confirmination)
      }
    } catch (error) {
      console.log('send otp error', error)
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (otp: string) => {
    try {
      setVerifyOTPLoading(true)
      const response = await confirmination?.confirm(otp)
      if (!!response?.user?.accessToken) {
        setMode('resetPassword')
        setVerifyOTPLoading(false)
      }
    } catch (error) {
      setVerifyOTPLoading(false)
      console.log('CONFIRM OTP ERROR', error)
    }
  }

  const handleResetPassword = async (values: any) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${Config.API_URL}/auth/password/reset`,
        {
          phoneNumber: values.phoneNumber,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response?.data?.success) {
        toast.success('Đặt lại mật khẩu thành công')
        setLoading(false)
      } else {
        toast.error('Đặt lại mật khẩu thất bại')
        setLoading(false)
      }
    } catch (error) {
      console.log('reset password error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPhoneNumber = async (values: any) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${Config.API_URL}/auth/phone-number/verify?phoneNumber=${values.phoneNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response?.data?.success) {
        handleSendOTP(values)
        setLoading(false)
      } else {
        toast.error('Số điện thoại này chưa được đăng ký, vui lòng thử lại')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      console.log('Verify phone number error', error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      onClose={onclickClose}
      open={isOpen}
      className="rounded-3xl"
      maxWidth="md"
      fullWidth={true}
    >
      <DialogContent>
        <div>
          <div className="w-full flex justify-between">
            <div></div>
            <IconButton onClick={onclickClose}>
              <XCircleIcon width={30} height={30} className="text-gray-700" />
            </IconButton>
          </div>
          <div className="flex flex-col laptop:flex laptop:flex-row justify-between items-center px-4 py-10">
            <div className="flex items-center justify-center px-20">
              <Image
                src={ForgotPassword}
                width={400}
                height={400}
                className="my-auto border border-gray-300"
              />
            </div>
            {mode == 'phoneNumber' && (
              <>
                <div className="space-y-7">
                  <div className="gap-y-1">
                    <h1 className="text-gray-600 font-semibold text-xl text-center">
                      Quên mật khẩu
                    </h1>
                    <p className="text-gray-500 text-sm text-center">
                      Điền số điện thoại của bạn vào đây để lấy lại mật khẩu
                    </p>
                  </div>
                  <div className="space-y-5">
                    <InputHookForm
                      control={control}
                      {...register('phoneNumber', {
                        pattern: {
                          value: regexes.phoneNumber,
                          message: 'Số điện thoại không hợp lệ',
                        },
                      })}
                      label="Số điện thoại"
                      mode="phoneNumber"
                      placeholder="0*********"
                    />
                  </div>

                  <button
                    type="submit"
                    name="submit-forgot-password"
                    onClick={handleSubmit(handleVerifyPhoneNumber)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                      }
                    }}
                    className="bg-blue-500 font-bold text-white  rounded-lg w-80 h-10"
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: 'white' }} size={20} />
                    ) : (
                      'Xác nhận'
                    )}
                  </button>
                  <div id="recaptcha"></div>
                </div>
              </>
            )}

            {mode == 'OTP' && (
              <>
                <div className="space-y-7">
                  <div className="gap-y-1">
                    <h1 className="text-gray-600 font-semibold text-xl text-center">
                      Nhập mã xác nhận
                    </h1>
                    <p className="text-gray-500 text-sm text-center">
                      Chúng tôi vừa gửi mã xác nhận đến điện thoại của bạn
                    </p>
                  </div>
                  <div className="space-y-2 flex flex-col items-center">
                    <OtpInput
                      onChangeValue={values => setOtpValues(values)}
                      size="small"
                    />
                  </div>

                  <button
                    onClick={() => handleVerifyOTP(otpValues)}
                    name="submit-otp"
                    className="bg-blue-500 font-bold text-white rounded-lg w-80 h-10"
                  >
                    {verifyOTPLoading ? (
                      <CircularProgress sx={{ color: 'white' }} size={20} />
                    ) : (
                      'Xác nhận'
                    )}
                  </button>
                  <button className="text-blue-500 font-semibold text-sm flex-start">
                    Quay lại
                  </button>
                </div>
              </>
            )}

            {mode == 'resetPassword' && (
              <>
                <div className="space-y-7">
                  <div className="gap-y-1">
                    <h1 className="text-gray-600 font-semibold text-xl text-center">
                      Quên mật khẩu
                    </h1>
                    <p className="text-gray-500 text-sm text-center">
                      Đặt lại mật khẩu của bạn
                    </p>
                  </div>
                  <div className="space-y-5">
                    <InputHookForm
                      control={control}
                      {...register('phoneNumber', {
                        pattern: {
                          value: regexes.phoneNumber,
                          message: 'Số điện thoại không hợp lệ',
                        },
                      })}
                      label="Số điện thoại"
                      mode="phoneNumber"
                      placeholder="0*********"
                    />
                    <InputHookForm
                      control={control}
                      {...register('newPassword', {
                        required: {
                          value: true,
                          message: 'Mật khẩu không được để trống',
                        },
                      })}
                      label="Mật khẩu mới"
                      mode="password"
                      placeholder="Nhập vào khẩu mới"
                    />
                  </div>

                  <button
                    type="submit"
                    name="submit-forgot-password"
                    onClick={handleSubmit(handleResetPassword)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                      }
                    }}
                    className="bg-blue-500 font-bold text-white  rounded-lg w-80 h-10"
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: 'white' }} size={20} />
                    ) : (
                      'Xác nhận'
                    )}
                  </button>
                  <div id="recaptcha" className=""></div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordDialog
