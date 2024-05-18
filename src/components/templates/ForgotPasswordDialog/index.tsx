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

interface IFormValue {
  email: string
  password: string
}

interface IForgotPasswordDialogProps {
  isOpen: boolean
  onclickClose: () => void
}

const ForgotPasswordDialog: React.FC<IForgotPasswordDialogProps> = props => {
  const { isOpen, onclickClose } = props
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const handleConfirm = (values: any) => {}

  console.log('ERRORS IS', errors)

  console.log('HAAH')

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

            <>
              <div className="space-y-7">
                <div className="gap-y-1">
                  <h1 className="text-gray-600 font-semibold text-xl text-center">
                    Quên mật khẩu
                  </h1>
                  <p className="text-gray-500 text-sm text-center">
                    Điền sô điện thoại của bạn vào đây để lấy lại mật khẩu
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
                  onClick={handleSubmit(handleConfirm)}
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
              </div>
            </>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordDialog
