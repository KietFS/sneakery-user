//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

//utils and types
import {
  setAccessToken,
  setAuth,
  setOpenVerifyPhoneNumberDialog,
  setTokenExpiredTime,
  setUser,
} from '@/redux/slices/auth'
import { loginService, registerService } from '@/services/api'
import { IUser } from '@/types/user'
import { IRootState } from '@/redux'
import { toast } from 'react-toastify'
import { configResponse } from '@/utils/request'
import { useRouter } from 'next/router'

export const useAuth = () => {
  //local state
  const [loginError, setLoginError] = useState<string>()
  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const [registerError, setRegisterError] = useState<any>()
  const [regsiterLoading, setRegisterLoading] = useState<boolean>(false)
  const router = useRouter()

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
          const currentTime = Date.now()
          //1 day expired time for token
          const configTime = 1000 * 60 * 60 * 24
          toast.success('Đăng nhập thành công', {
            position: 'top-right',
            autoClose: 0,
            theme: 'light',
            hideProgressBar: true,
          })
          dispatch(setUser(response?.data?.data as IUser))
          dispatch(setAccessToken(response?.data?.data?.token))
          dispatch(setAuth(true))
          dispatch(setTokenExpiredTime(currentTime + configTime))
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

  const logOut = () => {
    try {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      dispatch(setAccessToken(''))
      dispatch(setUser(null))
      dispatch(setTokenExpiredTime(null))
      toast.success('Đăng xuất thành công', {
        position: 'top-right',
        hideProgressBar: true,
      })
      router.reload()
    } catch (error) {
      console.log(error)
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
    logOut,
  }
}
