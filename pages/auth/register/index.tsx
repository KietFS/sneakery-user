import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'

//components
import InputConfirmPassword from '@/designs/InputConfirmPassword'
import InputText from '@/designs/InputName'

import Button from '@/designs/Button'
import EmailSentDialog from '@/components/EmailSentDialog'
import LoginBackground from '@/assets/images/LoginBackground.png'
import Image from 'next/image'
import Head from 'next/head'

//hooks
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/hooks/useRedux'

//utils
import { IRootState } from '@/redux'

import { setOpenEmailSentDialog } from '@/redux/slices/auth'
import BaseInput from '@/designs/BaseInput'

interface ILoginPageProps {}

interface IFormValue {
  email: string
  fullName: string
  password: string
  confirmPassword: string
}

const RegisterPage: React.FC<ILoginPageProps> = () => {
  const [initialValues, setInitialValues] = useState<IFormValue>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })
  const { openEmailSentDialog } = useAppSelector(
    (state: IRootState) => state.auth,
  )

  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
      email: yup
        .string()
        .email('Vui lòng nhập đúng định dạng email')
        .required('Vui lòng nhập số điện thoại của bạn'),
      password: yup
        .string()
        .min(6, 'Mật khẩu phải lớn hơn 6 kí tự')
        .required('Vui lòng nhập mật khẩu của bạn'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu phải khớp')
        .required('Vui lòng xác xác nhận mật khẩu của bạn'),
      fullName: yup.string().required('Vui lòng nhập tên của bạn'),
    })

  const handleSubmit = async (values: IFormValue) => {
    try {
      const { email, fullName, password } = values
      console.log('REGISTER PAYLOAD', values)
      register(password, fullName, email)
    } catch (error) {
      console.log('REGISTER ERROR', error)
    }
  }

  const { register, regsiterLoading } = useAuth()

  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <>
      <Head>
        <title>Sneakry - Đăng ký</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EmailSentDialog
        open={openEmailSentDialog}
        onClose={() => dispatch(setOpenEmailSentDialog(false))}
      />
      <div className="h-screen w-screen flex flex-col laptop:flex laptop:flex-row justify-center  items-center px-4 laptop:px-20 laptop:space-x-20">
        <div className="hidden laptop:block h-screen items-center pt-36">
          <Image
            src={LoginBackground}
            width={450}
            height={450}
            className="my-auto"
          />
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, submitForm, errors }) => {
            console.log('REGISTER FORMIK ERRORS', errors)
            return (
              <div className="space-y-7">
                <div className="space-x-1">
                  <h1 className="text-center text-blue-600 text-4xl font-bold">
                    Sneakery
                  </h1>
                  <p className="text-sm text-center text-gray-600 mt-2">
                    Trang đấu giá về giày hàng đầu Việt Nam
                  </p>
                </div>
                <div className="space-y-5">
                  <InputText name="fullName" label="Tên đầy đủ" required />
                  <BaseInput mode="email" name="email" label="Email" required />
                  <BaseInput
                    mode="password"
                    name="password"
                    label="Mật khẩu"
                    required
                  />
                  <InputConfirmPassword
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={submitForm}
                  className="bg-blue-500 font-bold text-white  rounded-lg w-80 h-10"
                >
                  {regsiterLoading ? '...' : 'Đăng ký'}
                </button>
                <div className="space-y-3">
                  <p className="text-gray-700 text-xs">Hoặc đăng nhập với</p>
                  <div className="flex items-center">
                    <div className="mr-3 cursor-pointer">
                      <Image
                        width={25}
                        height={25}
                        src="https://www.facebook.com/images/fb_icon_325x325.png"
                      />
                    </div>
                    <div className="mr-2 cursor-pointer">
                      <Image
                        width={25}
                        height={25}
                        src="data:image/png;base64,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"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <p className="text-xs text-gray-700">Bạn đã có tài khoản</p>
                    <p
                      className="text-xs text-blue-500 underline font-bold ml-1 cursor-pointer"
                      onClick={() => router.push('/auth/login')}
                    >
                      Đăng nhập ngay
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-xs text-gray-700">
                      Với việc đăng ký bạn đã đồng ý với
                    </p>
                    <p className="text-xs text-blue-500 underline font-bold ml-1 cursor-pointer">
                      {' '}
                      chính sách bảo mật
                    </p>
                  </div>
                  <p
                    className="text-xs text-red-500 underline font-bold ml-1 cursor-pointer text-center"
                    onClick={() => router.push('/')}
                  >
                    Quay về trang chủ
                  </p>
                </div>
              </div>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default RegisterPage
