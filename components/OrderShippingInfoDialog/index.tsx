import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import InputText from "../../designs/InputText";
import Button from "../../designs/Button";
import axios from "axios";
import { toast } from "react-toastify";
import SelectComponent from "../Select";
import RichTextInput from "../../designs/RichTextInput";
import GHNLogo from "../../assets/images/GHNLogo.png";
import Image from "next/image";

interface IFormValue {
  name: string;
  phoneNumber: string;
  ward?: string;
  district?: string;
  addressDetail: string;
  expressClient?: string;
}

export interface IOrderShippingInfoDialog {
  open: boolean;
  onClose: () => void;
  product?: IProduct;
}

interface IDistrict {
  id: string;
  name: string;
}

interface IWard {
  id: string;
  name: string;
}

function OrderShippingInfoDialog(props: IOrderShippingInfoDialog) {
  const { open, onClose, product } = props;
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    name: "",
    phoneNumber: "",
    ward: "",
    district: "",
    addressDetail: "",
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

  const clients = [
    {
      id: "giao-hang-nhanh",
      name: "Giao hàng nhanh",
      logo: GHNLogo,
    },
  ];
  const [clientSelected, setClientSelected] = React.useState<{
    id: string;
    name: string;
    logo: any;
  }>(clients?.[0]);

  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng điền tên của bạn"),
      phoneNumber: yup.string().required("Vui lòng nhập số điện thoại của bạn"),
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
      console.log("VALUES HERE", values);
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
          {({ submitForm, values, handleSubmit }) => {
            return (
              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-5">
                  <div className="w-full flex items-center">
                    <h1 className="text-gray-600 font-bold text-2xl mb-2">
                      Nhập thông tin địa chỉ giao hàng của bạn
                    </h1>
                  </div>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-2 gap-y-5 items-center justify-between">
                    <InputText
                      name="name"
                      value={initialValues?.name}
                      label="Tên của bạn"
                      placeholder="Nhập tên của bạn"
                    />
                    <InputText
                      name="phoneNumber"
                      value={initialValues?.phoneNumber}
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
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
                    value={initialValues?.phoneNumber}
                    label="Số nhà,tên đường"
                    placeholder="Nhập địa chỉ cụ thể của bạn"
                  />
                  <div className="col-span-2">
                    <SelectComponent
                      name="expressClient"
                      options={clients}
                      optionSelected={clientSelected}
                      onSelect={(option) => setClientSelected(option)}
                      label="Chọn đơn vị vận chuyển"
                      placeholder="Chọn đơn vị vận chuyển đơn hàng của bạn"
                      renderOption={(options) => {
                        return options.map((option, index) => (
                          <div
                            key={index.toString()}
                            className="w-full flex items-center justify-between px-4 cursor-pointer hover:opacity-80 hover:bg-gray-100"
                            onClick={() => setClientSelected(option)}
                          >
                            <p>{option.name}</p>
                            <Image src={option.logo} width={100} height={50} />
                          </div>
                        ));
                      }}
                    />
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
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default OrderShippingInfoDialog;
