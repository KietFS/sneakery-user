//hooks
import { useAppSelector } from '@/hooks/useRedux'
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

//utils and types
import {
  setAccessToken,
  setAuth,
  setOpenEmailSentDialog,
  setOpenVerifyPhoneNumberDialog,
  setUser,
  setUserBalance,
} from '@/redux/slices/auth'
import { isExistedEmail, loginService, registerService } from '@/services/api'
import { IUser } from '@/types/user'
import { IRootState } from '@/redux'
import { toast } from 'react-toastify'
import { auth } from '@/common/config/firebase'
import { configResponse } from '@/utils/request'
import React from 'react'
import axios from 'axios'
import { Config } from '@/config/api'

export const useAuth = () => {
  //local state
  const [loginError, setLoginError] = useState<string>()
  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const [registerError, setRegisterError] = useState<any>()
  const [regsiterLoading, setRegisterLoading] = useState<boolean>(false)

  //store
  const { user, accessToken } = useAppSelector(
    (state: IRootState) => state.auth,
  )

  //hooks
  const dispatch = useDispatch()

  //functions
  const login = async (email: string, password: string) => {
    try {
      setLoginLoading(true)
      const response = await loginService(email, password)
      if (response) {
        const { data, isSuccess, error } = configResponse(response)
        if (isSuccess) {
          toast.success('Đăng nhập thành công', {
            position: 'top-right',
            autoClose: 0,
            theme: 'colored',
            hideProgressBar: true,
          })

          console.log('LOGIN DATA', response?.data?.data)
          dispatch(setUser(response?.data?.data as IUser))
          dispatch(setAccessToken(response?.data?.data?.token))
          dispatch(setAuth(true))
        } else {
          console.log(error)
          setLoginError(error?.message as string)
        }
      }
    } catch (error) {
      console.log(error)
      setLoginError(error as string)
    } finally {
      setLoginLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    username: string,
    phoneNumber: string,
  ) => {
    try {
      setRegisterLoading(true)
      dispatch(setOpenVerifyPhoneNumberDialog(true))
      const data = await registerService(email, password, username, phoneNumber)
      if (data?.data.success === true) {
        toast.success('Đăng ký người dùng thành công')
        dispatch(setOpenVerifyPhoneNumberDialog(false))
      }
    } catch (error) {
      console.log('ERROR', error)
      dispatch(setOpenVerifyPhoneNumberDialog(false))
    } finally {
      setRegisterLoading(false)
      dispatch(setOpenVerifyPhoneNumberDialog(false))
    }
  }

  return {
    user,
    login,
    loginError,
    loginLoading,
    register,
    registerError,
    regsiterLoading,
    isAuthenticated: !!accessToken,
    accessToken,
  }
}
