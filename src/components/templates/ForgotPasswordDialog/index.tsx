import {
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material'

//form validation
import { Formik } from 'formik'
import * as yup from 'yup'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import BaseInput from '@/components/atoms/BaseInput'
import { useAppSelector } from '@/hooks/useRedux'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { IRootState } from '@/redux'

import LoginBackground from '@/assets/images/LoginBackground.png'
import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/common/config/firebase'
import { useForm } from 'react-hook-form'

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
  const { control, handleSubmit } = useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const handleConfirm = (values: any) => {}

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
                src={LoginBackground}
                width={400}
                height={400}
                className="my-auto"
              />
            </div>

            <>
              <div className="space-y-7">
                <div className="space-y-5">
                  <BaseInput name="email" label="Email" required mode="email" />
                  <BaseInput
                    name="password"
                    label="Mật khẩu"
                    required
                    mode="password"
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
