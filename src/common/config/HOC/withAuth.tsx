import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useAppSelector } from '../../../hooks/useRedux'
import { IRootState } from '../../../redux'
import { toast } from 'react-toastify'

export function withAuthorization<T>(Component: React.FC<T>) {
  return (props: T) => {
    const router = useRouter()
    const { accessToken } = useAuth()

    useEffect(() => {
      if (!accessToken) {
        toast.error('Cần đăng nhập trước khi vào trang này')
        router?.push('/')
      }
    }, [accessToken, router])

    if (!accessToken) {
      return null // Prevent rendering of the component if not authorized
    } else {
      return <Component {...(props as any)} />
    }
  }
}
