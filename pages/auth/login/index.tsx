import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import * as yup from "yup";
import { Formik } from "formik";

//components
import InputPassword from "../../../components/InputPassword";
import InputPhoneNumber from "../../../components/InputPhone";
import { Spinner } from "flowbite-react";
import { StyledSpinner } from "@nextui-org/react";

interface ILoginPageProps {}

interface IFormValue {
  phoneNumber: string;
  password: string;
}

const validationSchema = yup.object().shape<{ [k in keyof IFormValue]: any }>({
  phoneNumber: yup.string().required("Vui lòng nhập số điện thoại của bạn"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải lớn hơn 6 kí tự")
    .required("Vui lòng nhập mật khẩu của bạn"),
});
const LoginPage: React.FC<ILoginPageProps> = () => {
  const [initialValues, setInitialValues] = useState<IFormValue>({
    phoneNumber: "",
    password: "",
  });

  const handleSubmit = (values: IFormValue) => {
    console.log(values);
  };

  return (
    <div className="flex w-full">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto justify-center">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <div className="w-200 space-y-5">
            <InputPhoneNumber
              name="phoneNumber"
              required
              label="Số điện thoại"
            />
            <InputPassword name="password" required label="Mật khẩu" />
            <button
              type="submit"
              className={`bg-red-200 rounded-lg w-72 h-10 text-center text-red-500 font-bold ${true}`}
            >
              <Spinner size="md" color="pink" />
            </button>
          </div>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
