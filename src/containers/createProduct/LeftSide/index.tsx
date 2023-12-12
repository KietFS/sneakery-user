import React, { useEffect, useState } from 'react'

//styles
import SelectComponent from '@/components/Select'
import Button from '@/designs/Button'
import DatePicker from '@/designs/DatePicker'
import InputNumber from '@/designs/InputNumber'
import InputText from '@/designs/InputText'
import UploadImage from '@/designs/UploadImage'
import MultipleUploadImage from '@/designs/MultipleUploadImage'
import { MenuItem } from '@mui/material'

//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from 'next/router'

//utils
import axios from 'axios'
import * as yup from 'yup'
import { IRootState } from '@/redux'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'

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
  bidClosingDate?: string
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

const validationSchema = yup.object().shape<{ [k in keyof IFormValue]: any }>({
  productName: yup.string().required('Vui lòng nhập tên sản phẩm'),
  priceStart: yup.string().required('Vui lòng giá khởi điển'),
  stepBid: yup.string().required('Vui lòng nhập bước giá'),
})

const LeftSide: React.FC<ILeftSideProps> = props => {
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const [initialValues, setInitialValues] = useState<IFormValue>({
    productName: '',
    brand: '',
    condition: '',
    category: '',
    priceStart: '',
    stepBid: '',
    bidClosingDate: '',
    size: '',
    color: '',
  })
  const brands: IOption[] = [
    {
      id: '1',
      name: 'Nike',
    },
    {
      id: '2',
      name: 'Adidas',
    },
    {
      id: '3',
      name: 'Puma',
    },
    {
      id: '4',
      name: 'Balenciaga',
    },
    {
      id: '5',
      name: 'Saint Laurent',
    },
    {
      id: '6',
      name: 'Dior',
    },
    {
      id: '7',
      name: 'Balenciaga',
    },
    {
      id: '8',
      name: 'Chanel',
    },
  ]
  const conditions: IOption[] = [
    {
      id: 'fullbox',
      name: 'Nguyên seal',
    },
    {
      id: 'used',
      name: 'Đã qua sử dụng',
    },
  ]
  const categories: IOption[] = [
    {
      id: 'nam',
      name: 'Nam',
    },
    {
      id: 'nu',
      name: 'Nữ',
    },
    {
      id: 'unisex',
      name: 'Unisex',
    },
  ]
  const sizes: IOption[] = [
    {
      id: '36',
      name: 'Size 36 (VN) - 5.5 (US)',
    },
    {
      id: '37',
      name: 'Size 37 (VN) - 6 (US)',
    },

    {
      id: '38',
      name: 'Size 38 (VN) - 7 (US)',
    },
    {
      id: '39',
      name: 'Size 39 (VN) - 8 (US)',
    },
    {
      id: '40',
      name: 'Size 40 (VN) - 8.5 (US)',
    },
    {
      id: '41',
      name: 'Size 41 (VN) - 9.5 (US)',
    },
    {
      id: '42',
      name: 'Size 42 (VN) - 10 (US)',
    },
    {
      id: '43',
      name: 'Size 43 (VN) - 11 (US)',
    },
    {
      id: '44',
      name: 'Size 44 (VN) - 11.5 (US)',
    },
    {
      id: '45',
      name: 'Size 45 (VN) - 12.5 (US)',
    },
  ]
  const colors: IColor[] = [
    {
      id: 'white',
      name: 'Trắng',
      bg: 'bg-white',
    },
    {
      id: 'silver',
      name: 'Bạc',
      bg: 'bg-silver-500',
    },
    {
      id: 'gray',
      name: 'Xám',
      bg: 'bg-gray-500',
    },
    {
      id: 'black',
      name: 'Đen',
      bg: 'bg-black-500',
    },
    {
      id: 'denim',
      name: 'Denim',
      bg: 'bg-denim-500',
    },
    {
      id: 'cream',
      name: 'Kem',
      bg: 'bg-cream-500',
    },
    {
      id: 'red',
      name: 'Đỏ',
      bg: 'bg-red-500',
    },
    {
      id: 'pink',
      name: 'Hồng',
      bg: 'bg-pink-500',
    },
    {
      id: 'green',
      name: 'Xanh lá',
      bg: 'bg-green-500',
    },
    {
      id: 'yellow',
      name: 'Màu vàng',
      bg: 'bg-yellow-500',
    },
    {
      id: 'brown',
      name: 'Màu nâu',
      bg: 'bg-brown-500',
    },
  ]

  //state
  const [brandSelected, setBrandSelected] = useState<IOption | null>(null)
  const [conditionSelected, setConditionSelected] = useState<IOption | null>(
    null,
  )
  const [categorySelected, setCategorySelected] = useState<IOption | null>(null)
  const [sizeSelected, setSizeSelected] = useState<IOption | null>(null)
  const [colorSelected, setColorSelected] = useState<IColor | null>(null)
  const [thumbnailSelected, setThumbnailSelected] = useState<any[] | null>(null)
  const [imagesSelected, setImagesSelected] = useState<any[] | null>(null)
  const [brandError, setBrandError] = useState<string>('')
  const [categoryError, setCategoryError] = useState<string>('')
  const [colorError, setColorError] = useState<string>('')
  const [conditionError, setConditionError] = useState<string>('')
  const [sizeError, setSizeError] = useState<string>('')
  const [createLoading, setCreateLoading] = useState<boolean>(false)
  const [address, setAddress] = useState<any | null>(null)

  //hooks
  const router = useRouter()

  //functions
  const handleSubmit = async (values: IFormValue) => {
    if (!address) {
      toast.error('Vui lòng cập nhật địa chỉ của bạn', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    } else {
      const newDate = values.bidClosingDate?.split('T')
      let isAM = newDate?.[1].slice(-2)
      if (brandSelected === null) {
        setBrandError('Vui lòng chọn thương hiệu')
      }
      if (categorySelected === null) {
        setCategoryError('Vui lòng chọn danh mục')
      }
      if (colorSelected === null) {
        setColorError('Vui lòng chọn màu')
      }
      if (conditionSelected === null) {
        setConditionError('Vui lòng chọn tình trạng')
      }
      if (sizeSelected === null) {
        setSizeError('vui lòng chọn size')
      }
      if (
        brandSelected === null ||
        categorySelected === null ||
        colorSelected === null ||
        conditionSelected === null ||
        sizeSelected === null
      ) {
      } else {
        const payload = {
          name: values.productName,
          condition: conditionSelected?.id.toUpperCase(),
          category: categorySelected?.id,
          brand: brandSelected?.name,
          color: colorSelected?.id as string,
          size: Number(sizeSelected.id),
          bidClosingDateTime: values.bidClosingDate,
          priceStart: Number(values.priceStart?.split(',').join('')),
          stepBid: Number(values.stepBid?.split(',').join('')),
        }
        let formData = new FormData()
        const json = JSON.stringify(payload)
        const blob = new Blob([json], {
          type: 'application/json',
        })
        formData.append('thumbnail', thumbnailSelected?.[0])
        imagesSelected?.map(image => formData.append('images', image))
        formData.append('bidCreateRequest', blob)
        try {
          setCreateLoading(true)
          const response = await axios({
            method: 'post',
            url: `${Config.API_URL}/bids`,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user?.token}`,
            },
            data: formData,
          })
          const { data, isSuccess, error } = configResponse(response)
          if (isSuccess) {
            toast.success('Tạo sản phẩm thành công', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            })
            router.push('/')
          }
        } catch (error) {
          console.log('CREATE BID ERROR', { error })
        } finally {
          setCreateLoading(false)
        }
      }
    }
  }

  useEffect(() => {
    if (user) {
      getUserAddress()
    }
  }, [user])

  const getUserAddress = async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/addresses/${user?.id}/`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )
      const { data, isSuccess, error } = configResponse(response)

      if (isSuccess) {
        setAddress(data?.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {}
  }

  return (
    <div className="bg-white border-gray-200 border rounded-xl h-full p-6">
      <h1 className="text-gray-600 font-bold text-2xl mb-2">
        Thêm sản phẩm đấu giá
      </h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, submitForm, errors }) => {
          console.log('ERRORS', { errors })
          return (
            <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-5">
              <InputText
                name="productName"
                value={initialValues.productName}
                label="Tên sản phẩm"
                placeholder="Nhập tên sản phẩm"
              />
              <SelectComponent
                keyLabel="name"
                keyValue="id"
                name="brand"
                optionSelected={brandSelected}
                options={brands}
                label="Chọn thương hiệu"
                placeholder=""
                onSelect={brand => setBrandSelected(brand)}
                error={brandError}
              />
              <SelectComponent
                keyLabel="name"
                keyValue="id"
                name="condition"
                optionSelected={conditionSelected}
                options={conditions}
                label="Chọn tình trạng hiệu"
                placeholder=""
                onSelect={condition => setConditionSelected(condition)}
                error={conditionError}
              />
              <SelectComponent
                keyLabel="name"
                keyValue="id"
                name="category"
                optionSelected={categorySelected}
                options={categories}
                label="Chọn danh mục"
                placeholder=""
                onSelect={category => setCategorySelected(category)}
                error={categoryError}
              />
              <SelectComponent
                keyLabel="name"
                keyValue="id"
                name="size"
                optionSelected={sizeSelected}
                options={sizes}
                label="Chọn size"
                placeholder=""
                onSelect={size => setSizeSelected(size)}
                error={sizeError}
              />
              <SelectComponent
                keyLabel="name"
                keyValue="id"
                name="color"
                optionSelected={colorSelected}
                options={colors}
                label="Chọn màu"
                error={colorError}
                placeholder=""
                onSelect={size => setSizeSelected(size)}
                renderOption={options => {
                  return options?.map((option: any) => (
                    <MenuItem
                      value={option.id}
                      onClick={() => setColorSelected(option)}
                    >
                      <div className="w-full p-2 flex justify-between items-center ">
                        <p className="text-sm text-gray-600">
                          {option.id.toUpperCase()}
                        </p>
                        <div
                          className={`${option.bg} w-6 h-6 rounded-full border-gray-200 border`}
                        ></div>
                      </div>
                    </MenuItem>
                  ))
                }}
              />
              <InputNumber
                name="priceStart"
                value={initialValues?.priceStart}
                label="Giá khởi điểm"
                placeholder="Nhập mức giá khởi điểm của sản phẩm"
              />
              <InputNumber
                name="stepBid"
                value={initialValues?.stepBid}
                label="Bước giá"
                placeholder="Nhập bước giá của sản phẩm"
              />
              <DatePicker
                label="Chọn ngày kết thúc đấu giá"
                name="bidClosingDate"
              />
              <div className="col-span-2 mt-2">
                <UploadImage
                  onSelect={listImage => setThumbnailSelected(listImage)}
                />
                <MultipleUploadImage
                  onSelect={listImage => setImagesSelected(listImage)}
                />
              </div>

              <div className="col-span-2 mt-2">
                <Button
                  variant="primary"
                  isLoading={createLoading}
                  type="submit"
                  title="Đăng sản phẩm"
                  onClick={() => handleSubmit(initialValues as any)}
                />
              </div>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export default LeftSide
