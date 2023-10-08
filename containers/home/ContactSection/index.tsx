import React, { useState } from 'react'

//styles
import InputEmail from '@/designs/InputEmail'
import InputPhoneNumber from '@/designs/InputPhone'

//utils
import { Formik } from 'formik'
import * as yup from 'yup'

interface IContactSectionProps {}

interface IFormValue {
  phoneNumber?: string
  email?: string
  reason?: string
}

const validationSchema = yup
  .object()
  .shape<{ [k in keyof IFormValue]: any }>({})

const ContactSection: React.FC<IContactSectionProps> = props => {
  const [initialValues, setInitialValues] = useState<IFormValue>({})
  const handleSubmit = (values: IFormValue) => {
    console.log({ values })
  }
  return (
    <div className="h-[700px]">
      <div className="bg-transparent h-[100px] rounded-xl"></div>
      <div className="bg-blue-50 h-[700px] laptop:h-[500px] rounded-xl"></div>
      <div className="space-y-10 rounded-xl shadow-lg bg-white relative bottom-[800px] laptop:bottom-[600px] mx-10 border border-gray-200 py-5">
        <div className="space-y-2 px-5">
          <h2 className="text-gray-500 font-bold text-3xl text-center">
            Hợp tác với chúng tôi
          </h2>
          <p className="text-lg text-gray-500 font-normal text-center">
            Sneakery luôn luôn tìm những người bạn đồng hành có cùng chí hướng
            và đam mê với lĩnh vực đấu giá này
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <div className="space-y-10 flex flex-col justify-center items-center">
              <div className="grid grid-cols-1 laptop:grid-cols-2 gap-x-10 gap-y-10 justify-center">
                <div className="w-full px-5">
                  <InputPhoneNumber
                    name="phoneNumber"
                    label="Số điện thoại"
                    className="w-[200px] rounded-lg laptop:w-full"
                  />
                </div>
                <div className="w-full px-5">
                  <InputEmail
                    name="email"
                    label="Email của bạn"
                    className="w-[200px] rounded-lg laptop:w-full"
                  />
                </div>
              </div>
              <button className="px-6 py-2 bg-blue-500 text-white font-semibold text-lg rounded-lg active:opacity-80 mx-auto">
                Kết nối ngay
              </button>
            </div>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
