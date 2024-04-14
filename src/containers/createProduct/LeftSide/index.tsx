import React, { useEffect, useRef, useState } from 'react'

//styles

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils
import { IRootState } from '@/redux'
import SelectCategoryDialog from '@/designs/SelectCategoryDialog'
import InputHookForm from '@/designs/InputHookForm'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Config } from '@/config/api'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import StepOne from '../StepOne'
import StepTwo from '../StepTwo'
import Slider from 'react-slick'
import StepThree from '../StepThree'
import StepFour from '../StepFour'
import { configResponse } from '@/utils/request'
import { useRouter } from 'next/router'

interface ILeftSideProps {}

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

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    getFieldState,
    watch,
  } = useForm()
  const formTool = {
    control,
    register,
    handleSubmit,
    getValues,

    setValue,
    watch,
  }
  const { accessToken } = useAuth()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

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
  const [verfiyPaymentLoading, setVerifyPaymentLoading] =
    useState<boolean>(false)
  const router = useRouter()

  const sliderRef = useRef<any>(null)

  //functions

  const formatDate = (dateString: string) => {
    var originalDate = new Date(dateString)
    originalDate.setDate(originalDate.getDate())
    originalDate.setHours(originalDate.getHours())
    originalDate.setMinutes(originalDate.getMinutes())
    originalDate.setSeconds(originalDate.getSeconds())

    var newYear = originalDate.getFullYear()
    var newMonth = originalDate.getMonth() + 1
    var newDay = originalDate.getDate()

    var newDateString =
      newYear +
      '-' +
      (newMonth < 10 ? '0' : '') +
      newMonth +
      '-' +
      (newDay < 10 ? '0' : '') +
      newDay +
      `T${originalDate.getHours()}:${originalDate.getMinutes()}:${originalDate.getSeconds() || '00'}`

    return newDateString
  }

  const handleCreateBidValue = async (values: any, imageIds: number[]) => {
    const payload = {
      ...values,
      bidClosingDateTime: formatDate(values?.bidClosingDateTime),
      priceStart: Number(values?.priceStart),
      stepBid: Number(values?.stepBid),
      categoryId: currentCategory?.id,
      imageIds: imageIds,
      description: '',
    }
    try {
      setCreateLoading(true)
      const response = await axios({
        method: 'post',
        url: `${Config.API_URL}/bids`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: payload,
      })

      if (response?.data?.success) {
        setCreateLoading(false)
        router?.push('/')
        toast.success('Tạo sản phẩm đấu giá thành công')
      }
    } catch (error) {
      setCreateLoading(false)
      console.log('Create bid item error', error)
    }
  }

  const handlePressPost = async (values: any) => {
    try {
      setCreateLoading(true)
      let formData = new FormData()
      //add image and thumbnail and we done
      formData.append('thumbnail', thumbnailSelected?.[0])
      imagesSelected?.map(image => formData.append('images', image))
      const uploadMediaResponse = await axios.post(
        `${Config.API_URL}/medias/upload-images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (uploadMediaResponse?.data?.success) {
        let returnedIds = uploadMediaResponse?.data?.data?.map(
          (image: any, imageIndex: number) => image?.id,
        )
        await handleCreateBidValue(values, returnedIds)
      }
    } catch (error) {
      setCreateLoading(false)
      console.log('UPLOAD MEDIA ERROR', error)
      toast.error('Đăng ảnh không thành công')
    }
  }

  return (
    <>
      <Slider
        ref={sliderRef as any}
        {...settings}
        swipeToSlide={false}
        swipe={false}
        className={`block justify-center  w-full laptop:h-[500px] h-[400px] rounded-lg mx-auto`}
      >
        <StepOne
          formTool={formTool as any}
          customFields={customFields}
          setCustomFields={setCustomFields}
          onPressNext={() => (sliderRef as any)?.current?.slickGoTo(1)}
          onPressOpenCategory={() => setOpenSelectCategory(true)}
        />

        <StepTwo
          formTool={formTool as any}
          onPressNext={() => (sliderRef as any)?.current?.slickGoTo(2)}
          onPressBack={() => (sliderRef as any)?.current?.slickGoTo(0)}
        />

        <StepThree
          setThumbnailSelected={setThumbnailSelected}
          setImagesSelected={setImagesSelected}
          onPressNext={() => (sliderRef as any)?.current?.slickGoTo(3)}
          onPressBack={() => (sliderRef as any)?.current?.slickGoTo(1)}
          onPressOpenCategory={() => setOpenSelectCategory(true)}
          imagesSelected={imagesSelected}
          thumbnailSelected={thumbnailSelected}
        />

        <StepFour
          formTool={formTool as any}
          buttonLoading={createLoading}
          onPressOpenCategory={() => setOpenSelectCategory(true)}
          onPressBack={() => (sliderRef as any)?.current?.slickGoTo(2)}
          onPressCreateBid={values => handlePressPost(values)}
        />
      </Slider>

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
