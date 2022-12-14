import { Formik } from "formik";
import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { IRootState } from "../../../redux";
import * as yup from "yup";
import axios from "axios";
import SelectComponent from "../../../components/Select";
import RichTextInput from "../../../designs/RichTextInput";
import Button from "../../../designs/Button";
import InputText from "../../../designs/InputText";

interface ILeftSideProps {}

interface IDistrict {
  id: string;
  name: string;
}

interface IWard {
  id: string;
  name: string;
}

interface IFormValue {
  ward?: string;
  district?: string;
  addressDetail?: string;
  phoneNumber: string;
}

interface IFormValue {}

const RightSide: React.FC<ILeftSideProps> = (props) => {
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    ward: "",
    district: "",
    addressDetail: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [initialLoading, setInitialLoading] = React.useState<boolean>(false);
  const [listDistrict, setListDistrict] = React.useState<IDistrict[]>([]);
  const [districtSelected, setDistrictSelected] =
    React.useState<IDistrict | null>(null);
  const [listWard, setListWard] = React.useState<IWard[]>([]);
  const [wardSelected, setWardSelected] = React.useState<IWard | null>(null);
  const [districtError, setDistrictError] = React.useState<string>("");
  const [wardError, setWardError] = React.useState<string>("");
  const { user } = useAppSelector((state: IRootState) => state.auth);

  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
      phoneNumber: yup.string().required("Vui lòng điền số điện thoại của bạn"),
      addressDetail: yup
        .string()
        .required("Vui lòng nhập địa chỉ cụ thể của bạn"),
    });

  const handleSubmit = async (values: IFormValue) => {
    try {
      if (districtSelected === null) {
        setDistrictError("Vui lòng chọn quận");
      } else {
        setDistrictError("");
      }
      if (wardSelected === null) {
        setWardError("Vui lòng chọn phường");
      } else {
        setWardError("");
      }
      setLoading(true);
      const data = await axios.post(
        "https://sneakery.herokuapp.com/api/address/create",
        {
          homeNumber: values.addressDetail,
          cityName: "Thành phố Hồ Chí Minh",
          districtName: districtSelected?.name,
          wardName: wardSelected?.name,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getListDistricts = async () => {
    try {
      setInitialLoading(true);
      const data = await axios.get(
        "https://sneakery.herokuapp.com/api/address/districts"
      );
      data && setListDistrict(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoading(false);
    }
  };

  const getListWars = async (districtId: string) => {
    try {
      setInitialLoading(true);
      const data = await axios.get(
        `https://sneakery.herokuapp.com/api/address/districts/${districtId}`
      );
      data && setListWard(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoading(false);
    }
  };

  React.useEffect(() => {
    getListDistricts();
  }, []);

  React.useEffect(() => {
    if (districtSelected) {
      getListWars(districtSelected.id as string);
      setWardSelected(null);
    }
  }, [districtSelected]);

  return (
    <div className="bg-white border-gray-200 border rounded-xl h-full p-4">
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
                    Thông tin để chúng tôi nhận hàng
                  </h1>
                </div>
                <div className="grid grid-cols-1 tablet:grid-cols-1 gap-x-2 gap-y-5 items-center justify-between">
                  <InputText
                    name="phoneNumber"
                    value={initialValues?.phoneNumber}
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                  <SelectComponent
                    name="district"
                    label="Chọn quận"
                    optionSelected={districtSelected}
                    onSelect={(option) => setDistrictSelected(option)}
                    options={listDistrict}
                    placeholder="Chọn quận bạn muốn giao hàng đến"
                    error={districtError}
                  />
                  <SelectComponent
                    name="ward"
                    label="Chọn phường"
                    optionSelected={wardSelected}
                    onSelect={(option) => setWardSelected(option)}
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
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <div></div>
                <div className="flex items-center">
                  <Button
                    type="submit"
                    title="Cập nhật"
                    variant="primary"
                    className="ml-2"
                    isLoading={loading}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default RightSide;
