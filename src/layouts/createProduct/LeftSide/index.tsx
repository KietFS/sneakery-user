import React, { useEffect, useRef, useState } from 'react'

//styles

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils
import { IRootState } from '@/redux'
import SelectCategoryDialog from '@/components/atoms/SelectCategoryDialog'
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
import { configResponse } from '@/utils/request'
import { useRouter } from 'next/router'
import { IProductCategory, TypeId } from '@/types'
import { CircularProgress, Dialog, DialogContent } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setCreatedProduct } from '@/redux/slices/auth'

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
  const { currentCategory } = useAppSelector(
    (state: IRootState) => state.category,
  )

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
  const [createdId, setCreatedId] = useState<TypeId | null>(null)

  //hooks
  const { accessToken } = useAuth()
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
    getFieldState,
    setValue,
    watch,
  }
  const dispatch = useDispatch()
  const router = useRouter()
  const sliderRef = useRef<any>(null)

  //functions

  const formatDate = (dateString: string) => {
    let temp = new Date(dateString)
    temp.setHours(temp.getHours() + 7) // Giảm 7 giờ
    return temp?.toISOString()
  }

  const handleCreateBidValue = async (values: any, imageIds: number[]) => {
    const payload = {
      ...values,
      bidClosingDateTime: formatDate(values?.bidClosingDateTime),
      priceStart: Number(values?.priceStart),
      stepBid: Number(values?.stepBid),
      categoryId: currentCategory?.id,
      imageIds: imageIds,
      reservePrice: Number(values?.reservePrice) || 0,
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
      const { isSuccess, error, data } = configResponse(response)
      if (isSuccess) {
        await localStorage.setItem(
          'productId',
          JSON.stringify(data?.data?.bidId),
        )
        setCreatedId(data?.data?.bidId)
        await localStorage.setItem('paymentType', 'PRE_SALE_FEE')
        setCreateLoading(false)
        ;(sliderRef as any)?.current?.slickGoTo(3)
      } else {
        setCreateLoading(false)
      }
    } catch (error) {
      setCreateLoading(false)
      console.log('Create bid item error', error)
      dispatch(setCreatedProduct(null))
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
          formTool={formTool as any}
          onPressCreateBid={values => handlePressPost(values)}
        />

        <StepFour
          createdProductId={createdId as TypeId}
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

      {createLoading ? (
        <CreateLoadingDialog
          open={createLoading}
          onClose={() => setCreateLoading(false)}
        />
      ) : null}
    </>
  )
}

export default LeftSide

const CreateLoadingDialog: React.FC<{
  open: boolean
  onClose: () => void
}> = props => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      className="rounded-lg"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogContent className="max-h-[600px]">
        <p className="text-lg text-gray-600 font-semibold text-center mb-1">
          Chúng tôi đang xử lý sản phẩm
        </p>
        <p className="text-sm text-gray-500 font-normal text-center mb-4">
          Vui lòng đợi trong giây lát
        </p>
        <div className="w-full h-full flex justify-center items-center py-10">
          <CircularProgress size={50} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
