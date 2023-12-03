import * as React from 'react'

//styles
import RichTextInput from '@/designs/RichTextInput'
import Button from '@/designs/Button'
import SelectComponent from '@/components/Select'
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'

//store
import { IRootState } from '@/redux'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils and types
import axios from 'axios'
import * as yup from 'yup'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { IAddressResponse } from '@/containers/createProduct/LeftSide'
import { configResponse } from '@/utils/request'
import { Config } from '@/config/api'

interface IFormValue {
  ward?: string
  district?: string
  addressDetail?: string
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

function AddressDialog(props: IAddressDialogProps) {
  //props
  const { open, onClose } = props

  //state
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    ward: '',
    district: '',
    addressDetail: '',
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
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const [address, setAddress] = React.useState<IAddressResponse[]>([])
  const [isInitialAddress, setIsInitialAddress] = React.useState<boolean>(false)

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

  const handleSubmit = async (values: IFormValue) => {
    if (checkSelectionErrors()) return
    setLoading(true)

    const payload = {
      homeNumber: values.addressDetail,
      cityId: 1,
      districtId: districtSelected?.DistrictID,
      wardId: wardSelected?.WardCode,
    }

    console.log('payload is', payload)
    try {
      const response = await axios.post(
        `${Config.API_URL}/addresses`,
        {
          homeNumber: values.addressDetail,
          cityId: 1,
          districtId: districtSelected?.DistrictID,
          wardId: wardSelected?.WardCode,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        toast.success('Cập nhật địa chỉ thành công')
      } else {
        toast.error(`Cập nhật địa chỉ thất bại, ${error?.message || ''}`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      onClose()
    }
  }

  const getListDistricts = async () => {
    const apiUrl =
      'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district'

    const headers = {
      token: '5ded4c97-7c70-11ed-b62e-2a5743127145',
      'Content-Type': 'application/json',
    }

    const requestData = {
      province_id: 202,
    }
    try {
      setInitialLoading(true)
      const response = await axios.get(apiUrl, { headers, params: requestData })
      if (response?.status == 200) {
        const { data } = response?.data
        setListDistrict(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setInitialLoading(false)
    }
  }

  const getListWars = async (districtId: string) => {
    const apiUrl =
      'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward'
    const headers = {
      token: '5ded4c97-7c70-11ed-b62e-2a5743127145',
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
      const response = await axios.get(`${Config.API_URL}/address/get-all`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      const { data, isSuccess, error } = configResponse(response)

      if (isSuccess) {
        setAddress(data?.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    if (listDistrict.length == 0) {
      getListDistricts()
    }
    if (address.length == 0) {
      getUserAddress()
    }
  }, [])

  React.useEffect(() => {
    if (districtSelected && isInitialAddress === false) {
      getListWars(districtSelected.DistrictID)
      setWardSelected(null)
    }
  }, [districtSelected])

  React.useEffect(() => {
    if (address.length >= 1) {
      setIsInitialAddress(true)
      setInitialValues({
        addressDetail: address?.[0]?.homeNumber,
      })
      // setWardSelected(address?.[0]?.ward)
      // setDistrictSelected(address?.[0]?.district)
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
              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-5">
                  <div className="w-full flex items-center">
                    <h1 className="text-gray-600 font-bold text-2xl mb-2">
                      Quản lý địa chỉ của bạn
                    </h1>
                  </div>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-2 gap-y-5 items-center justify-between">
                    <SelectComponent
                      name="district"
                      label="Chọn quận"
                      optionSelected={districtSelected}
                      onSelect={option => {
                        setDistrictSelected(option)
                        setIsInitialAddress(false)
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
                  <RichTextInput
                    name="addressDetail"
                    value={initialValues?.addressDetail}
                    label="Số nhà,tên đường"
                    placeholder="Nhập địa chỉ cụ thể của bạn"
                  />
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
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default AddressDialog
