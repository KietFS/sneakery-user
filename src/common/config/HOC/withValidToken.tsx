import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useAppSelector } from '../../../hooks/useRedux'
import { IRootState } from '../../../redux'
import FourceLogOutDialog from '@/components/organisms/ForceLogOutDialog'
import { toast } from 'react-toastify'

export function withValidToken<T>(Component: React.FC<T>) {
  return (props: T) => {
    const [openForceLogOutDialog, setOpenForceLogoutDialog] =
      useState<boolean>(false)

    const { tokenExpiredTime } = useAppSelector(
      (state: IRootState) => state.auth,
    )
    const { isAuthenticated } = useAuth()

    useEffect(() => {
      if (isAuthenticated) {
        let currentTime = Date.now()
        if (tokenExpiredTime !== null && currentTime > tokenExpiredTime) {
          setOpenForceLogoutDialog(true)
        } else {
          setOpenForceLogoutDialog(false)
        }
      }
    }, [tokenExpiredTime])

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
