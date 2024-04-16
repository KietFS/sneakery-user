import Button from '@/components/atoms/Button'
import MultipleUploadImage from '@/components/atoms/MultipleUploadImage'
import UploadImage from '@/components/atoms/UploadImage'
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  TagIcon,
} from '@heroicons/react/20/solid'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

interface IStepThreeProps {
  setThumbnailSelected: (listImage: any[]) => void
  setImagesSelected: (listImage: any[]) => void
  imagesSelected: any | null
  thumbnailSelected: any | null
  onPressOpenCategory: () => void
  onPressNext: () => void
  onPressBack: () => void
}

const StepThree: React.FC<IStepThreeProps> = props => {
  const {
    setThumbnailSelected,
    setImagesSelected,
    onPressOpenCategory,
    onPressNext,
    onPressBack,
    imagesSelected,
    thumbnailSelected,
  } = props

  const isDisabled = !thumbnailSelected || !imagesSelected

  return (
    <div className="bg-white border-gray-200 border rounded-xl h-full p-6 min-h-[500px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-gray-600 font-bold text-2xl mb-2">
            Chọn hình ảnh cho sản phẩm
          </h1>
          {/* <Tooltip title="Thay đổi danh mục">
            <IconButton onClick={() => onPressOpenCategory()}>
              <TagIcon className="w-6 h-6 text-gray-500 font-semibold" />
            </IconButton>
          </Tooltip> */}
        </div>

        <div className="grid grid-cols-1 laptop:grid-cols-2 mt-4 gap-x-5">
          <UploadImage
            onSelect={listImage => {
              setThumbnailSelected(listImage)
            }}
          />

          <MultipleUploadImage
            onSelect={listImage => {
              setImagesSelected(listImage)
            }}
          />
        </div>
      </div>
      <div className="col-span-2 mt-2 flex justify-between">
        <div></div>
        <div className="flex items-center gap-x-2">
          <Tooltip title="Quay về bước trước">
            <IconButton onClick={onPressBack}>
              <ArrowSmallLeftIcon className="w-10 h-10 text-gray-400 hover:text-gray-600" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Qua bước tiếp theo">
            <IconButton onClick={onPressNext} disabled={isDisabled}>
              <ArrowSmallRightIcon
                className={`w-10 h-10 text-gray-600 hover:text-blue-500 ${isDisabled ? 'opacity-30' : ''}`}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default StepThree
