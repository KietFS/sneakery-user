import React, { useRef, useState } from 'react'

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

  const sliderRef = useRef<any>(null)

  const [step, setStep] = useState<number>(1)
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

  const handleCreateBidValue = async (values: any) => {
    const payload = {
      ...values,
      bidClosingDateTime: formatDate(values?.bidClosingDateTime),
      priceStart: Number(values?.priceStart),
      stepBid: Number(values?.stepBid),
      categoryId: currentCategory?.id,
    }
    try {
      setCreateLoading(true)
      const response = await axios({
        method: 'post',
        url: `${Config.API_URL}/bids`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        data: payload,
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

  const handlePressPost = async (values: any) => {
    try {
      let formData = new FormData()
      //add image and thumbnail and we done
      formData.append('thumbnail', thumbnailSelected?.[0])
      imagesSelected?.map(image => formData.append('images', image))
      // console.log('FORM DATA', imagesSelected, thumbnailSelected)
      if (true) {
        // const reponse = await handleCreateBidValue(values)
      }
    } catch (error) {
      toast.error('Đăng ảnh không thành công')
      console.log('UPLOAD IMAGE ERROR', error)
    }
  }

  return (
    <>
      <Slider
        ref={sliderRef as any}
        {...settings}
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
          onPressOpenCategory={() => setOpenSelectCategory(true)}
        />

        <StepThree
          setThumbnailSelected={setThumbnailSelected}
          setImagesSelected={setImagesSelected}
          onPressNext={() => (sliderRef as any)?.current?.slickGoTo(3)}
          onPressBack={() => (sliderRef as any)?.current?.slickGoTo(1)}
          onPressOpenCategory={() => setOpenSelectCategory(true)}
        />

        <StepFour
          formTool={formTool as any}
          onPressOpenCategory={() => setOpenSelectCategory(true)}
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
