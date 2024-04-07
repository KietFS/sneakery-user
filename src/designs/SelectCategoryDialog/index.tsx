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
import {
  setCurrentProductCategory,
  setListCategory,
} from '@/redux/slices/category'
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
  const { currentCategory, listCategory } = useAppSelector(
    (state: IRootState) => state.category,
  )

  const dispatchSetCurrentCategory = (category: IProductCategory) =>
    dispatch(setCurrentProductCategory(category))

  const handlePressConfirm = () => {
    router.push('/createProduct')
    onClose()
  }

  const getListProductCategories = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${Config.API_URL}/categories/`)
      if (response?.data?.success) {
        dispatch(setListCategory(response?.data?.data))
        setIsLoading(false)
      } else {
        setIsLoading(false)
        console.log('Get list product categories failed', response?.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.log('Get list product categories failed', error)
    }
  }

  const handlePressClose = () => onClose()

  useEffect(() => {
    if (listCategory?.length == 0) {
      getListProductCategories()
    }
  }, [])

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
              <div className="grid grid-cols-6 gap-x-4 gap-y-4">
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
                <div className="mt-4 w-[120px] h-[60px] rounded-lg bg-gray-300"></div>
              </div>
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
          ) : (
            <>
              <div className="">
                <div className="grid grid-cols-6 gap-x-4 gap-y-4">
                  {listCategory?.map(
                    (category: IProductCategory, categoryIndex: number) => (
                      <button
                        onClick={() => dispatchSetCurrentCategory(category)}
                        className={`px-2 h-[60px] bg-white ${currentCategory?.name == category?.name ? `border-blue-500 bg-blue-100` : `border-gray-300`}  border   hover:opacity-60 shadow-lg rounded-lg`}
                      >
                        <p
                          className={`text-gray-500 text-sm ${currentCategory?.name == category?.name ? `text-blue-500` : `text-gray-600`}`}
                        >
                          {category?.name}
                        </p>
                      </button>
                    ),
                  )}
                </div>
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
