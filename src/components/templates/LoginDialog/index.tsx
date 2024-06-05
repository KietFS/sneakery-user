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
import { useDispatch } from 'react-redux'
import { setOpenForgotPasswordDialog } from '@/redux/slices/auth'

interface IFormValue {
  email: string
  password: string
}

interface IDialogProps {
  isOpen: boolean
  onclickClose: () => void
}

const LoginDialog: React.FC<IDialogProps> = props => {
  const { isOpen, onclickClose } = props
  //state
  const [initialValues, setInitialValues] = useState<IFormValue>({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()

  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
      email: yup
        .string()
        .email('Vui lòng nhập đúng định dạng email')
        .required('Vui lòng nhập email của bạn'),
      password: yup
        .string()
        .min(6, 'Mật khẩu phải lớn hơn 6 kí tự')
        .required('Vui lòng nhập mật khẩu của bạn'),
    })

  //hooks
  const { login, loginLoading, loginError } = useAuth()

  //store
  const { user, isAuth } = useAppSelector((state: IRootState) => state.auth)

  const handlePresslogin = (values: IFormValue) => {
    login(values.email, values.password)
  }

  const handlePressForgotPassword = () => {
    dispatch(setOpenForgotPasswordDialog(true))
    onclickClose()
  }

  useEffect(() => {
    if (!!user) {
      onclickClose()
    }
  }, [user])

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

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handlePresslogin}
            >
              {({ handleSubmit, submitForm, errors }) => {
                return (
                  <div className="space-y-7">
                    <div className="gap-y-1">
                      <h1 className="text-gray-600 font-semibold text-xl text-center">
                        Đăng nhập
                      </h1>
                      <p className="text-gray-500 text-sm text-center">
                        Đăng nhập vào hệ thống đấu giá Sneakery
                      </p>
                    </div>
                    <div className="space-y-5">
                      {loginError && (
                        <p className="text-blue-500">Đã có lỗi xảy ra</p>
                      )}
                      <BaseInput
                        name="email"
                        label="Email"
                        required
                        mode="email"
                      />
                      <BaseInput
                        name="password"
                        label="Mật khẩu"
                        required
                        mode="password"
                      />
                    </div>
                    <button
                      type="submit"
                      name="submit-login"
                      onClick={() => handleSubmit()}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          submitForm()
                        }
                      }}
                      className="bg-blue-500 font-bold text-white  rounded-lg w-80 h-10"
                    >
                      {loginLoading ? (
                        <CircularProgress sx={{ color: 'white' }} size={20} />
                      ) : (
                        'Đăng nhập'
                      )}
                    </button>

                    <div className="flex flex-row-reverse">
                      <button
                        className="text-red-500 font-semibold text-sm hover:opacity-30"
                        onClick={handlePressForgotPassword}
                      >
                        Quên mật khẩu ?
                      </button>
                    </div>
                  </div>
                )
              }}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
