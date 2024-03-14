import axios from 'axios'
import React, { useEffect, useState } from 'react'

//styles
import PostedCard from '@/designs/PostedCard'
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//store
import { IRootState } from '@/redux'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'
import SelectComponent from '../Select'
import Button from '@/designs/Button'
import { useDispatch } from 'react-redux'
import { setCurrentProductCategory } from '@/redux/slices/category'
//hooks
import { useRouter } from 'next/router'

interface ISelectCategoryDialogProps {
  open: boolean
  onClose: () => void
}

const SelectCategoryDialog: React.FC<ISelectCategoryDialogProps> = props => {
  const { open, onClose } = props
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { currentCategory } = useAppSelector(
    (state: IRootState) => state.category,
  )

  const dispatchSetCurrentCategory = (category: IProductCategory) =>
    dispatch(setCurrentProductCategory(category))

  const handlePressConfirm = () => {
    router.push('/createProduct')
  }

  const handlePressClose = () => onClose()

  const listCategory = [
    {
      id: 1,
      name: 'Watches',
      properties: [
        {
          name: 'Brand',
          type: 'text',
        },
        {
          name: 'Water Resistance',
          type: 'boolean',
        },
        {
          name: 'Price',
          type: 'number',
        },
      ],
    },
    {
      id: 2,
      name: 'Shoes',
      properties: [
        {
          name: 'Brand',
          type: 'text',
          options: ['Nike', 'Adidas', 'Puma'],
        },
        {
          name: 'Size',
          type: 'text',
        },
        {
          name: 'Color',
          type: 'text',
        },
      ],
    },
    {
      id: 3,
      name: 'Clothes',
      properties: [
        {
          name: 'Brand',
          type: 'text',
        },
        {
          name: 'Size',
          type: 'text',
        },
        {
          name: 'Material',
          type: 'text',
        },
      ],
    },
  ]

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="md"
      fullWidth={true}
    >
      <DialogContent className="max-h-[1200px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Chọn danh mục sản phẩm
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          {isLoading ? (
            <div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>{' '}
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
            </div>
          ) : (
            <>
              <div className="">
                <SelectComponent
                  customStyles={{ width: '850px', height: 50 }}
                  name="category"
                  label="Chọn danh mục sản phẩm"
                  optionSelected={currentCategory}
                  onSelect={option => {
                    dispatchSetCurrentCategory(option)
                  }}
                  keyValue="id"
                  keyLabel="name"
                  options={listCategory}
                  placeholder="Chọn quận bạn muốn giao hàng đến"
                />
                <div className="flex justify-between items-center mt-12">
                  <div></div>
                  <div className="flex items-center">
                    <Button
                      variant="secondary"
                      onClick={handlePressClose}
                      title="Đóng"
                    />
                    <Button
                      type="submit"
                      title="Xác nhận"
                      variant="primary"
                      onClick={handlePressConfirm}
                      className="ml-2"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SelectCategoryDialog
