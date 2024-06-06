import {
  setAccessToken,
  setTokenExpiredTime,
  setUser,
} from '@/redux/slices/auth'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export interface RequestResponse {
  isSuccess: boolean
  data: any
  error?: {
    message: string
    status: number | null
    problem: string | null
  }
}

export const forceLogOut = () => {
  try {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.clear()
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

export function configResponse(response: AxiosResponse<any>): RequestResponse {
  try {
    if (!response) {
      throw new Error(
        'Cannot read properties of undefined (response: AxiosResponse)',
      )
    }

    const { data: responseData, status: responseStatus } = response
    const { success, message } = responseData

    if (success) {
      return { isSuccess: success, data: responseData, error: undefined }
    } else {
      console.log('response data', response)
      if (responseData?.exceptionType == 'AuthenticationException') {
        toast.error(
          responseData?.message || 'Session expired, please login again',
        )
        forceLogOut()
      }
      return {
        isSuccess: success,
        data: responseData,
        error: { message, status: responseStatus, problem: null },
      }
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      data: '',
      error: { message: error.message, status: null, problem: null },
    }
  }
}
