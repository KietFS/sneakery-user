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

export function configResponse(
  response: AxiosResponse<any>,
  token?: string,
): RequestResponse {
  try {
    if (!response) {
      throw new Error(
        'Cannot read properties of undefined (response: AxiosResponse)',
      )
    }

    const { data, status } = response
    const isSuccess = response?.status === 200

    if (isSuccess) {
      return { isSuccess, data, error: undefined }
    } else {
      if (token && status === 401) {
        alert('Session Expire')
      }

      const message =
        typeof data?.message === 'object'
          ? JSON.stringify(data.message)
          : data?.message || response.statusText

      return { isSuccess, data, error: { message, status, problem: null } }
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      data: 'try/catch',
      error: { message: error.message, status: null, problem: null },
    }
  }
}
