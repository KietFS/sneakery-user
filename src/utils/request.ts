import { AxiosResponse } from 'axios'

export interface RequestResponse {
  isSuccess: boolean
  data: any
  error?: {
    message: string
    status: number | null
    problem: string | null
  }
}

export function configResponse(response: AxiosResponse<any>): RequestResponse {
  try {
    if (!response) {
      console.log('HERE')
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
      if (responseStatus === 401) {
        alert('Session Expire Sir')
      }
      return {
        isSuccess: success,
        data: responseData,
        error: { message, status: responseStatus, problem: null },
      }
    }
  } catch (error: any) {
    console.log('ERROR IS', error)
    return {
      isSuccess: false,
      data: '',
      error: { message: error.message, status: null, problem: null },
    }
  }
}
