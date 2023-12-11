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
  setAuth,
  setOpenEmailSentDialog,
  setUser,
  setUserBalance,
} from '@/redux/slices/auth'
import { isExistedEmail, loginService, registerService } from '@/services/api'
import { IUser } from '@/types/user'
import store, { IRootState } from '@/redux'
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
  const [existed, setExisted] = useState<boolean | null>(null)
  const [registerError, setRegisterError] = useState<any>()
  const [regsiterLoading, setRegisterLoading] = useState<boolean>(false)
  const [loginWithGoogle, googleUser] = useSignInWithGoogle(auth)
  const [loginWithFacebook] = useSignInWithFacebook(auth)

  //store
  const { user } = useAppSelector((state: IRootState) => state.auth)

  //hooks
  const dispatch = useDispatch()

  React.useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem('user') as string)
    let balanceInfo = JSON.parse(localStorage.getItem('balanceInfo') as string)
    if (userInfo) {
      store.dispatch(setUser(userInfo))
      store.dispatch(setAuth(true))
    }
    if (balanceInfo) {
      store.dispatch(setUserBalance(balanceInfo?.balance))
    }
  }, [])

  const getWallet = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/wallet/${user?.id}`)
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        if (data?.data === null) {
          await localStorage.setItem('balance', JSON.stringify({ balance: 0 }))
        } else {
          await localStorage.setItem(
            'balance',
            JSON.stringify({ balance: data?.data.balance }),
          )
        }
      } else {
        return 0
      }
    } catch (error) {
      return 0
    } finally {
    }
  }

  useEffect(() => {
    if (!!user) {
      getWallet()
    }
  }, [user])

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

          dispatch(setUser(response?.data?.data as IUser))
          await localStorage.setItem(
            'user',
            JSON.stringify(response?.data?.data),
          )
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
  ) => {
    try {
      setRegisterLoading(true)
      const data = await registerService(email, password, username)

      if (data?.data.success === true) {
        dispatch(setOpenEmailSentDialog(true))
      }
    } catch (error) {
    } finally {
      setRegisterLoading(false)
    }
  }

  useEffect(() => {
    user && localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    googleUser && checkIsFirstTimeWithGoogle(googleUser?.user?.email as string)
  }, [googleUser])

  useEffect(() => {
    if (googleUser) {
      if (existed === true) {
        login(
          googleUser?.user?.email as string,
          googleUser?.user?.uid as string,
        )
      } else {
        registerService(
          googleUser.user.uid as string,
          googleUser.user.displayName as string,
          googleUser.user.email as string,
        )
      }
    }
  }, [existed])

  const checkIsFirstTimeWithGoogle = async (email: string) => {
    try {
      const isExisted = await isExistedEmail(email)
      isExisted && setExisted(true)
    } catch (error) {
      setExisted(false)
    }
  }

  const googleLogin = async () => {
    try {
      setLoginLoading(true)
      await loginWithGoogle()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    user,
    login,
    loginError,
    googleLogin,

    loginLoading,
    loginWithFacebook,
    loginWithGoogle,

    register,
    registerError,
    regsiterLoading,
  }
}
