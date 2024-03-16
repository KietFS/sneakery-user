import * as React from 'react'

//style
import InputText from '@/designs/InputText'
import Button from '@/designs/Button'
import SelectComponent from '../../designs/Select'
import Image from 'next/image'
import RichTextInput from '@/designs/RichTextInput'
import GHNLogo from '@/assets/images/GHNLogo.png'
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'

//store
import store, { IRootState } from '@/redux'

//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from 'next/router'

//utils
import axios from 'axios'
import { IAddressResponse } from '@/containers/createProduct/LeftSide'
import * as yup from 'yup'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'
import { setAuth, setUser, setUserBalance } from '@/redux/slices/auth'

export interface IOrderShippingInfoDialog {
  open: boolean
  onClose: () => void
  product?: IProduct
  orderId: string
  totalProduct: number
}

interface IFormValue {
  ward?: IWard | null
  district?: IDistrict | null
  addressDetail?: string
  phoneNumber?: string
}

export interface IAddressDialogProps {
  open: boolean
  onClose: () => void
}

interface IDistrict {
  DistrictID: string
  DistrictName: string
}

interface IWard {
  WardCode: string
  WardName: string
}

function OrderShippingInfoDialog(props: IOrderShippingInfoDialog) {
  //constanst
  const clients = [
    {
      id: 'giao-hang-nhanh',
      name: 'Giao hàng nhanh',
      logo: GHNLogo,
    },
  ]

  const { open, onClose } = props
  //state
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    ward: null,
    district: null,
    addressDetail: '',
    phoneNumber: '',
  })
  const [loading, setLoading] = React.useState<boolean>(false)
  const [initialLoading, setInitialLoading] = React.useState<boolean>(false)
  const [listDistrict, setListDistrict] = React.useState<IDistrict[]>([])
  const [districtSelected, setDistrictSelected] =
    React.useState<IDistrict | null>(null)
  const [listWard, setListWard] = React.useState<IWard[]>([])
  const [wardSelected, setWardSelected] = React.useState<IWard | null>(null)
  const [districtError, setDistrictError] = React.useState<string>('')
  const [wardError, setWardError] = React.useState<string>('')
  const { user, balance } = useAppSelector((state: IRootState) => state.auth)
  const [address, setAddress] = React.useState<any | null>(null)
  const [isExistedAddress, setIsExistedAddress] = React.useState<boolean>(false)
  const [shippingFee, setShippingFee] = React.useState<number>(0)

  const router = useRouter()

  //utils
  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
      addressDetail: yup
        .string()
        .required('Vui lòng nhập địa chỉ cụ thể của bạn'),
    })

  //functions
  const checkSelectionErrors = () => {
    if (districtSelected === null) {
      setDistrictError('Vui lòng chọn quận')
      return true
    } else {
      setDistrictError('')
    }
    if (wardSelected === null) {
      setWardError('Vui lòng chọn phường')
      return true
    } else {
      setWardError('')
    }
    return false
  }

  // const handleSubmit = async (values: IFormValue) => {
  //   if (checkSelectionErrors()) return
  //   setLoading(true)

  //   const payload = {
  //     homeNumber: values.addressDetail,
  //     cityCode: 202,
  //     districtCode: districtSelected?.DistrictID,
  //     wardCode: Number(wardSelected?.WardCode),
  //     phoneNumber: values.phoneNumber,
  //   }

  //   if (isExistedAddress == false) {
  //     try {
  //       const response = await axios.post(
  //         `${Config.API_URL}/addresses`,
  //         payload,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user?.token}`,
  //           },
  //         },
  //       )
  //       const { isSuccess, data, error } = configResponse(response)
  //       if (isSuccess) {
  //         toast.success('Cập nhật địa chỉ thành công')
  //       } else {
  //         toast.error(`Cập nhật địa chỉ thất bại, ${error?.message || ''}`)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       setLoading(false)
  //       onClose()
  //     }
  //   } else {
  //     try {
  //       const response = await axios.put(
  //         `${Config.API_URL}/addresses/${user?.id}/`,
  //         payload,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user?.token}`,
  //           },
  //         },
  //       )
  //       const { isSuccess, data, error } = configResponse(response)
  //       if (isSuccess) {
  //         toast.success('Cập nhật địa chỉ thành công')
  //       } else {
  //         toast.error(`Cập nhật địa chỉ thất bại, ${error?.message || ''}`)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       setLoading(false)
  //       onClose()
  //     }
  //   }
  // }

  const handleSubmit = async (values: IFormValue) => {
    try {
      if (districtSelected === null) {
        setDistrictError('Vui lòng chọn quận')
      } else {
        setDistrictError('')
      }
      if (wardSelected === null) {
        setWardError('Vui lòng chọn phường')
      } else {
        setWardError('')
      }
      setLoading(true)
      //FIX SAU
      if (balance >= Number((shippingFee / 23000).toFixed(0))) {
        const response = await axios.get(
          `${Config.API_URL}/transaction/paid?orderId=${
            props.orderId
          }&shippingFee=${(shippingFee / 23000).toFixed(0)}&subtotal=${
            props.totalProduct + Number((shippingFee / 23000).toFixed(0))
          }`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          },
        )

        const { data, isSuccess, error } = configResponse(response)

        if (isSuccess) {
          toast.success('Đặt hàng thành công', {
            position: 'top-right',
            hideProgressBar: true,
            theme: 'colored',
          })
        } else {
          toast.error(`${error?.message}`)
        }
        onClose()
        router.push('/orderStatus')
      } else {
        toast.error(
          'Tài khoản bạn không đủ chi trả cho phí vận chuyển, vui lòng nạp thêm tiền',
        )
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getListDistricts = async () => {
    const apiUrl =
      'https://online-gateway.ghn.vn/shiip/public-api/master-data/district'

    const headers = {
      token: '09b46603-9193-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json',
    }

    const requestData = {
      province_id: 202,
    }
    try {
      const response = await axios.get(apiUrl, { headers, params: requestData })
      if (response?.status == 200) {
        const { data } = response?.data
        setListDistrict(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  const getListWars = async (districtId: string) => {
    const apiUrl =
      'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward'
    const headers = {
      token: '09b46603-9193-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json',
    }
    const requestData = {
      district_id: districtId,
    }
    try {
      setInitialLoading(true)
      const response = await axios.get(apiUrl, { headers, params: requestData })
      if (response?.status == 200) {
        const { data } = response?.data
        setListWard(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setInitialLoading(false)
    }
  }

  const getUserAddress = async () => {
    try {
      setInitialLoading(true)
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
        setInitialLoading(false)
        setIsExistedAddress(true)
        setAddress(data?.data)
      } else {
        setInitialLoading(false)
        setIsExistedAddress(false)
        console.log('Error', error)
      }
    } catch (error) {
      setInitialLoading(false)
    }
  }

  React.useEffect(() => {
    if (wardSelected) {
      calculateShippingFee()
    }
  }, [wardSelected, districtSelected])

  const calculateShippingFee = async () => {
    const data = {
      service_type_id: 5,
      from_district_id: 3695,
      from_ward_code: '90742',
      to_district_id: districtSelected?.DistrictID,
      to_ward_code: `${wardSelected?.WardCode}`,
      height: 20,
      length: 30,
      weight: 10,
      width: 40,
      insurance_value: 0,
      coupon: null,
      items: [
        {
          name: 'TEST1',
          quantity: 1,
          height: 20,
          weight: 20,
          length: 20,
          width: 20,
        },
      ],
    }

    const headers = {
      'Content-Type': 'application/json',
      token: '09b46603-9193-11ee-b394-8ac29577e80e',
      ShopId: 4740288,
    }

    try {
      const response = await axios
        .post(
          'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
          data,
          { headers },
        )
        .then(response => {
          console.log(response.data)
          setShippingFee(response?.data?.data?.total)
        })
        .catch(error => {
          console.error(error)
        })
    } catch (error) {
      console.log('SHIPPING FEE ERROR', error)
    }
  }

  React.useEffect(() => {
    if (listDistrict.length == 0) {
      getListDistricts()
    }
    getUserAddress()
  }, [user])

  React.useEffect(() => {
    if (districtSelected) {
      calculateShippingFee()
      getListWars(districtSelected.DistrictID)
      setWardSelected(null)
    }
  }, [districtSelected])

  React.useEffect(() => {
    if (listWard?.length > 0 && address) {
      setWardSelected(
        listWard.find(item => {
          return item.WardCode == address?.wardCode
        }) as any,
      )
    }
  }, [listWard, address])

  React.useEffect(() => {
    if (!!address) {
      calculateShippingFee()
      setDistrictSelected(
        listDistrict.find(item => {
          return item.DistrictID == address?.districtCode
        }) as any,
      )

      setInitialValues({
        addressDetail: address?.homeNumber,
        phoneNumber: address?.phoneNumber,
        district: listDistrict.find(item => {
          return item.DistrictID == address?.districtCode
        }),
      })
    }
  }, [address])

  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ submitForm, values, handleSubmit, errors }) => {
            return (
              <>
                {initialLoading ? (
                  <div className="h-[300px] items-center justify-center">
                    <h1 className="text-gray-600 font-bold text-2xl mb-2">
                      Nhập thông tin địa chỉ giao hàng của bạn
                    </h1>
                    <div className="w-full flex justify-between gap-x-10 items-center mt-8">
                      <div className="animate-pulse bg-neutral-200 w-1/2 h-[50px] rounded-xl"></div>
                      <div className="animate-pulse bg-neutral-200 w-1/2 h-[50px] rounded-xl"></div>
                    </div>

                    <div className="w-full flex justify-between gap-x-10 items-center mt-4">
                      <div className="animate-pulse bg-neutral-200 w-1/2 h-[50px] rounded-xl"></div>
                      <div className="animate-pulse bg-neutral-200 w-1/2 h-[50px] rounded-xl"></div>
                    </div>
                    <div className="w-full flex justify-between gap-x-10 items-center mt-4">
                      <div className="animate-pulse bg-neutral-200 w-1/2 h-[10px] rounded-xl"></div>
                      <div className="animate-pulse bg-neutral-200 w-1/2 h-[10px] rounded-xl"></div>
                    </div>
                    <div className="w-full flex justify-between gap-x-2 items-center mt-8">
                      <div></div>
                      <div className="flex gap-x-2">
                        <div className="animate-pulse bg-neutral-200 w-[150px] h-[50px] rounded-xl"></div>
                        <div className="animate-pulse bg-neutral-200 w-[150px] h-[50px] rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-10">
                    <div className="flex flex-col space-y-5">
                      <div className="w-full flex items-center">
                        <h1 className="text-gray-600 font-bold text-2xl mb-2">
                          Nhập thông tin địa chỉ giao hàng của bạn
                        </h1>
                      </div>
                      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-2 gap-y-5 items-center justify-between">
                        <SelectComponent
                          name="district"
                          label="Chọn quận"
                          optionSelected={districtSelected}
                          onSelect={option => {
                            setDistrictSelected(option)
                          }}
                          keyValue="DistrictID"
                          keyLabel="DistrictName"
                          options={listDistrict}
                          placeholder="Chọn quận bạn muốn giao hàng đến"
                          error={districtError}
                        />
                        <SelectComponent
                          name="ward"
                          label="Chọn phường"
                          keyLabel="WardName"
                          keyValue="WardCode"
                          optionSelected={wardSelected}
                          onSelect={option => setWardSelected(option)}
                          options={listWard}
                          placeholder="Chọn phường bạn muốn giao hàng đến"
                          error={wardError}
                        />
                      </div>
                      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-2 gap-y-5 items-center justify-between">
                        <RichTextInput
                          name="addressDetail"
                          value={initialValues?.addressDetail}
                          label="Số nhà,tên đường"
                          placeholder="Nhập địa chỉ cụ thể của bạn"
                        />
                        <RichTextInput
                          name="phoneNumber"
                          value={initialValues?.phoneNumber}
                          label="Số điện thoại"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                      <div className="col-span-2"> </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 font-bold">
                          Phí giao hàng
                        </div>
                        <div className="text-sm text-red-500 font-bold">
                          {(shippingFee / 23000)
                            .toFixed(0)
                            .toString()
                            .prettyMoney()}
                          $
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div></div>
                      <div className="flex items-center">
                        <Button
                          variant="secondary"
                          onClick={() => onClose()}
                          title="Đóng"
                        />
                        <Button
                          type="submit"
                          title="Xác nhận"
                          variant="primary"
                          className="ml-2"
                          isLoading={loading}
                          onClick={handleSubmit}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default OrderShippingInfoDialog
