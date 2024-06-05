import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useAppSelector } from '../../../hooks/useRedux'
import { IRootState } from '../../../redux'
import { toast } from 'react-toastify'
import FourceLogOutDialog from '@/components/organisms/ForceLogOutDialog'

export function withAuthorization<T>(Component: React.FC<T>) {
  return (props: T) => {
    const router = useRouter()
    const { accessToken } = useAuth()

    const [openForceLogOutDialog, setOpenForceLogoutDialog] =
      useState<boolean>(false)

    const { tokenExpiredTime } = useAppSelector(
      (state: IRootState) => state.auth,
    )

    useEffect(() => {
      let currentTime = Date.now()
      if (tokenExpiredTime !== null && currentTime > tokenExpiredTime) {
        setOpenForceLogoutDialog(true)
      } else {
        setOpenForceLogoutDialog(false)
      }
    }, [tokenExpiredTime])

    useEffect(() => {
      if (!accessToken) {
        toast.error('Cần đăng nhập trước khi vào trang này')
        router?.push('/')
      }
    }, [accessToken, router])

    if (!accessToken) {
      return null // Prevent rendering of the component if not authorized
    } else {
      return (
        <>
          {openForceLogOutDialog && (
            <FourceLogOutDialog open={openForceLogOutDialog} />
          )}
          <Component {...(props as any)} />
        </>
      )
    }
  }
}
