import React, { useEffect } from 'react'

//styles
import Button from '@/components/atoms/Button'
import { Dialog, DialogContent } from '@mui/material'
import { useAuth } from '@/hooks/useAuth'
import SessionExpired from '@/assets/images/SessionExpired.png'
import Image from 'next/image'

interface IForceLogOutDialog {
  open: boolean
}

const FourceLogOutDialog: React.FC<IForceLogOutDialog> = props => {
  const { open } = props
  const { logOut } = useAuth()

  useEffect(() => {
    const forceLogOut = setTimeout(() => {
      logOut()
    }, 2000)

    return () => clearTimeout(forceLogOut)
  }, [])

  return (
    <Dialog open={open} className="rounded-lg" maxWidth="md" fullWidth={true}>
      <DialogContent>
        <h1 className="text-gray-600 font-bold text-xl mb-2 ">
          Phiên đăng nhập của bạn đã hết hạn
        </h1>
        <p className="text-xs text-gray-500 italic font-semibold">
          Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại
        </p>
        <div className="w-full flex justify-center">
          <Image
            src={SessionExpired}
            width={300}
            height={300}
            className="my-auto"
          />
        </div>
        <div className="flex justify-between">
          <div></div>
          <div className="flex gap-x-2 mt-5"></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FourceLogOutDialog
