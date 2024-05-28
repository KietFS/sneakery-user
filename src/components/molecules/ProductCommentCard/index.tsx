import { Avatar } from '@mui/material'
import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface IProductCommentCardProps {
  comment: string
  user: string
}

const ProductCommentCard: React.FC<IProductCommentCardProps> = props => {
  const { comment, user } = props
  return (
    <div className="my-4 py-3 px-4 rounded-xl bg-gray-50 h-fit">
      <div className="flex items-center gap-x-2">
        <Avatar sx={{ bgcolor: '#9ca3af' }}>{user?.[0]}</Avatar>
        <div>
          <p className="text-lg font-semibold text-gray-800">{user}</p>
          <div className="mt-1">
            <p className="text-gray-600 text-sm">{comment}</p>
          </div>
        </div>
      </div>

      <div className="ml-12 mt-2 py-2 px-1 border-t border-gray-200">
        <div className="flex items-center gap-x-2">
          <Avatar sx={{ bgcolor: '#3b82f6' }}>S</Avatar>
          <div>
            <p className="text-lg font-semibold text-gray-800">Người đăng</p>
            <div className="mt-1">
              <p className="text-gray-600 text-sm">{comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCommentCard
