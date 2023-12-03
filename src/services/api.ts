import { Config } from '@/config/api'
import axios from 'axios'
import { toast } from 'react-toastify'

export const loginService = async (email: string, password: string) => {
  try {
    const data = await axios.post(`${Config.API_URL}/auth/signin`, {
      email,
      password,
    })
    if (data) return data
  } catch (error: any) {
    console.log(error)
    console.log(error)
    console.log('REGISTER ERROR', error)
    toast.error(error.response.data.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }
}

export const registerService = async (
  password: string,
  username: string,
  email: string,
) => {
  try {
    const data = await axios.post(`${Config.API_URL}/auth/signup`, {
      username,
      email,
      password,
    })
    if (data) return data
  } catch (error: any) {
    console.log(error)
    console.log('REGISTER ERROR', error)
    toast.error(error.response.data.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }
}

export const isExistedEmail = async (email: string) => {
  try {
    const isExisted = await axios.get(
      `${Config.API_URL}/auth/checkemail?email=${email}`,
    )
    if (isExisted) {
      return isExisted
    }
  } catch (error) {
    console.log(error)
  }
}
