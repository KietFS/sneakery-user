import React, { useEffect, useState } from 'react'

//styles
import SelectComponent from '@/designs/Select'
import Button from '@/designs/Button'
import { IconButton, MenuItem, Tooltip } from '@mui/material'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils
import * as yup from 'yup'
import { IRootState } from '@/redux'
import SelectCustomFieldComponent from '@/components/SelectCustomField'
import { TagIcon } from '@heroicons/react/24/outline'
import SelectCategoryDialog from '@/designs/SelectCategoryDialog'
import InputHookForm from '@/designs/InputHookForm'
import { useForm } from 'react-hook-form'
import SelectCustomFieldHookForm from '@/designs/SelectCustomFieldHookForm'
import RadioButtonHookForm from '@/designs/RadioButtonHookForm'
import UploadImage from '@/designs/UploadImage'
import MultipleUploadImage from '@/designs/MultipleUploadImage'
import axios from 'axios'
import { Config } from '@/config/api'
import DatePickerHookForm from '@/designs/DatePickerHookForm'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'

interface ILeftSideProps {}

interface IFormValue {
  productName: string
  brand?: string
  size?: string
  color?: string
  condition?: string
  category?: string
  priceStart: string
  stepBid: string
  bidClosingDateTime?: string
}

interface IOption {
  id: string
  name: string
}

interface IColor {
  id: string
  name: string
  bg: string
}

export interface IAddressResponse {
  addressId: number
  homeNumber: string
  cityName: string
  district: IOption
  ward: IOption
}

const LeftSide: React.FC<ILeftSideProps> = props => {
  //hooks
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const { currentCategory } = useAppSelector(
    (state: IRootState) => state.category,
  )
  const { control, register, handleSubmit, getValues, setValue, watch } =
    useForm()
  const formTool = {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
  }
  const { accessToken } = useAuth()

  //local state
  const [customFields, setCustomFields] = useState<
    {
      name: string
      type: string
      options?: string[]
      value?: string
    }[]
  >((currentCategory as IProductCategory)?.properties)
  const [openSelectCategory, setOpenSelectCategory] = useState<boolean>(false)
  const [thumbnailSelected, setThumbnailSelected] = useState<any[] | null>(null)
  const [imagesSelected, setImagesSelected] = useState<any[] | null>(null)
  const [createLoading, setCreateLoading] = useState<boolean>(false)

  //functions

  const formatDate = (dateString: string) => {
    // Chuỗi ngày tháng ban đầu

    // Tạo một đối tượng Date từ chuỗi ban đầu
    var originalDate = new Date(dateString)

    // Thêm 3 ngày vào ngày ban đầu
    originalDate.setDate(originalDate.getDate() + 3)

    // Thiết lập giờ, phút và giây mới
    originalDate.setHours(12)
    originalDate.setMinutes(0)
    originalDate.setSeconds(0)

    // Lấy các thành phần ngày tháng năm mới
    var newYear = originalDate.getFullYear()
    var newMonth = originalDate.getMonth() + 1 // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    var newDay = originalDate.getDate()

    // Định dạng lại chuỗi ngày tháng năm mới theo yêu cầu
    var newDateString =
      newYear +
      '-' +
      (newMonth < 10 ? '0' : '') +
      newMonth +
      '-' +
      (newDay < 10 ? '0' : '') +
      newDay +
      'T12:00:00'

    return newDateString
  }

  const handleCreateBid = async (values: any) => {
    const payload = {
      ...values,
      bidClosingDateTime: formatDate(values?.bidClosingDateTime),
      priceStart: Number(values?.priceStart),
      stepBid: Number(values?.stepBid),
      categoryId: currentCategory?.id,
    }
    let formData = new FormData()
    const payloadJSON = JSON.stringify(payload)
    const payloadBlob = new Blob([payloadJSON], {
      type: 'application/json',
    })
    formData.append('bidCreateRequest', payloadBlob)
    //add image and thumbnail and we done
    formData.append('thumbnail', thumbnailSelected?.[0])
    imagesSelected?.map(image => formData.append('images', image))

    try {
      setCreateLoading(true)
      const response = await axios({
        method: 'post',
        url: `${Config.API_URL}/bids`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        data: formData,
      })

      if (response?.data?.success) {
        setCreateLoading(false)
        toast.success('Tạo sản phẩm đấu giá thành công')
      }
    } catch (error) {
      setCreateLoading(false)
      console.log('Create bid item error', error)
    }
  }

  useEffect(() => {
    setCustomFields((currentCategory as IProductCategory)?.properties)
  }, [currentCategory])

  return (
    <>
      <div className="bg-white border-gray-200 border rounded-xl h-full p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-600 font-bold text-2xl mb-2">
            Thêm sản phẩm đấu giá
          </h1>
          <Tooltip title="Thay đổi danh mục">
            <IconButton onClick={() => setOpenSelectCategory(true)}>
              <TagIcon className="w-6 h-6 text-gray-500 font-semibold" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-5">
          <InputHookForm
            control={control}
            label={`Tên sản phẩm`}
            placeholder={`Nhập tên của sản phẩm`}
            {...register('name', { required: 'Bạn chưa nhập tên sản phẩm' })}
          />
          <InputHookForm
            control={control}
            label={`Giá khởi điểm`}
            placeholder={`Nhập giá khởi điểm của sản phẩm`}
            {...register('priceStart', {
              required: 'Bạn chưa nhập giá khởi điểm của sản phẩm',
            })}
          />
          <InputHookForm
            control={control}
            label={`Bước giá`}
            placeholder={`Nhập bước giá của sản phẩm`}
            {...register('stepBid', {
              required: 'Bạn chưa nhập bước giá của sản phẩm',
            })}
          />

          {(currentCategory as IProductCategory)?.properties?.map(
            (property, propertyIndex) =>
              !!property?.options?.length ? (
                <>
                  <SelectCustomFieldHookForm
                    placeholder={`Chọn trường ${property?.name}`}
                    name={`properties.${property?.name}`}
                    label={`Chọn ${property?.name}`}
                    options={property?.options}
                    control={control}
                    onSelect={option => {
                      let cloneFieldValue = [...customFields]
                      cloneFieldValue[propertyIndex] = {
                        ...customFields[propertyIndex],
                        value: option,
                      }
                      setCustomFields([...cloneFieldValue])
                    }}
                  />
                </>
              ) : (
                <>
                  {property.type == 'text' ? (
                    <InputHookForm
                      control={control}
                      label={`${property?.name}`}
                      placeholder={`Nhập ${property?.name} của sản phẩm`}
                      {...register(`properties.${property?.name}`)}
                    />
                  ) : (
                    <>
                      {property.type == 'number' ? (
                        <InputHookForm
                          {...register(`properties.${property?.name}`)}
                          control={control}
                          label={`${property?.name}`}
                          placeholder={`Nhập ${property?.name} của sản phẩm`}
                        />
                      ) : (
                        <RadioButtonHookForm
                          name={`properties.${property?.name}`}
                          control={control}
                          label={`${property?.name}`}
                        />
                      )}
                    </>
                  )}
                </>
              ),
          )}

          <DatePickerHookForm
            {...register('bidClosingDateTime', {
              required: 'Vui lòng chọn ngày kết thúc đấu giá',
            })}
            label="Chọn thời điểm kết thúc đấu giá"
            control={control}
          />
          <div></div>

          <div className="flex col-span-2 flex-col w-full">
            <UploadImage
              onSelect={listImage => {
                setThumbnailSelected(listImage)
              }}
            />
          </div>
          <div className="flex flex-col w-full col-span-2">
            <MultipleUploadImage
              onSelect={listImage => {
                setImagesSelected(listImage)
              }}
            />
          </div>

          <div className="col-span-2 mt-2">
            <Button
              variant="primary"
              isLoading={createLoading}
              type="submit"
              title="Đăng sản phẩm"
              onClick={handleSubmit(handleCreateBid)}
            />
          </div>
        </div>
      </div>

      {openSelectCategory ? (
        <SelectCategoryDialog
          open={openSelectCategory}
          onClose={() => setOpenSelectCategory(false)}
        />
      ) : null}
    </>
  )
}

export default LeftSide
