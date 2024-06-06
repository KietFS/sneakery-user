import React, { useEffect, useRef, useState } from 'react'

//styles

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils
import { IRootState } from '@/redux'
import SelectCategoryDialog from '@/components/atoms/SelectCategoryDialog'
import InputHookForm from '@/components/atoms/InputHookForm'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Config } from '@/config/api'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import Slider from 'react-slick'
import StepThree from './StepThree'
import StepFour from './StepFour'
import { configResponse, forceLogOut } from '@/utils/request'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { IProductCategory } from '@/types'

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
    let temp = new Date(dateString)
    temp.setHours(temp.getHours() + 7) // Giảm 7 giờ
    return temp?.toISOString()
  }

  const handleUpdateBidValue = async (values: any, imageIds: number[]) => {
    const payload = {
      ...values,
      bidClosingDateTime: formatDate(values?.bidClosingDateTime),
      priceStart: Number(values?.priceStart),
      stepBid: Number(values?.stepBid),
      categoryId: currentCategory?.id,
      imageIds: imageIds,
      reservePrice: Number(values?.reservePrice) || 0,
      description: '',
    }
    try {
      setCreateLoading(true)
      const response = await axios({
        method: 'put',
        url: `${Config.API_URL}/bids`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: payload,
      })

      const { isSuccess, error, data } = configResponse(response)

      if (isSuccess) {
        setCreateLoading(false)
        router?.push('/')
        toast.success('Tạo sản phẩm đấu giá thành công')
      } else {
        setCreateLoading(false)
        router?.push('/')
        toast.success('Tạo sản phẩm đấu giá thất bại, vui lòng thử lại sau')
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
        await handleUpdateBidValue(values, returnedIds)
      } else {
        toast.error(
          'Đăng ảnh không thành công' ||
            uploadMediaResponse?.data?.data?.message,
        )
      }
    } catch (error: any) {
      setCreateLoading(false)
      console.log('UPLOAD MEDIA ERROR', error)
      if (error?.response?.status == 401) {
        toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
        forceLogOut()
      } else {
        toast.error('Đăng ảnh không thành công, vui lòng thử lại sau')
      }
    }
  }

  return (
    <>
      <Slider
        ref={sliderRef as any}
        {...settings}
        swipeToSlide={false}
        swipe={false}
        className={`block justify-center bg-gray-50 w-full laptop:h-[500px] h-[400px] rounded-lg mx-auto`}
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
