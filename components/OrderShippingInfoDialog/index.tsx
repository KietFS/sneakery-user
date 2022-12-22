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
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import { IAddressResponse } from "../../containers/createProduct/LeftSide";
import { useEffect } from "react";

interface IFormValue {
  name?: string;
  phoneNumber?: string;
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
  const { user, balance } = useAppSelector((state: IRootState) => state.auth);
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    name: user?.username as string,
    phoneNumber: "0819190777",
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
  const [address, setAddress] = React.useState<IAddressResponse[]>([]);
  const [isInitialAddress, setIsInitialAddress] =
    React.useState<boolean>(false);
  const [shippingFee, setShippingFee] = React.useState<number>(50000);

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
      if (balance >= shippingFee) {
        const data = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/1`
        );

        data &&
          toast.success("Đặt hàng thành công", {
            position: "top-right",
            hideProgressBar: true,
            theme: "colored",
          });
        onClose();
      } else {
        toast.error(
          "Tài khoản bạn không đủ chi trả cho phí vận chuyển, vui lòng nạp thêm tiền"
        );
      }
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

  const temp = "Thành phố Thủ Đức";

  const calculateShippingFee = async () => {
    try {
      const response = await axios.get(
        `https://sneakery.herokuapp.com/api/shipping_fee/get?originDistrict=${temp}&destinationDistrict=${districtSelected?.name}`
      );
      response && setShippingFee(response.data.data.fee);
    } catch (error) {
      console.log("SHIPPING FEE ERROR", error);
    }
  };

  React.useEffect(() => {
    getListDistricts();
    getUserAddress();
  }, []);

  React.useEffect(() => {
    if (districtSelected && isInitialAddress === false) {
      getListWars(districtSelected.id as string);
      setWardSelected(null);
    }
  }, [districtSelected]);

  React.useEffect(() => {
    districtSelected !== null && calculateShippingFee();
  }, [districtSelected]);

  const getUserAddress = async () => {
    try {
      const response = await axios.get(
        `https://sneakery.herokuapp.com/api/address/get_all`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      response && setAddress(response.data.data);
      response && console.log("ADDRESS RESPONBSE", response);
    } catch (error) {
      console.log("GET USER ADDRESS ERROR", error);
    }
  };

  React.useEffect(() => {
    if (address) {
      setIsInitialAddress(true);
      setInitialValues({
        ...initialValues,
        addressDetail: address?.[0]?.homeNumber,
      });
      console.log("ADDRESS", { address });
      setWardSelected(address?.[0]?.ward);
      setDistrictSelected(address?.[0]?.district);
    }
  }, [address]);

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
            console.log("ERROR FORM", { errors });
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
                      onSelect={(option) => {
                        setIsInitialAddress(false);
                        setDistrictSelected(option);
                      }}
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
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 font-bold">
                      Phí giao hàng
                    </div>
                    <div className="text-sm text-red-500 font-bold">
                      {shippingFee.toString().prettyMoney()}$
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
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default OrderShippingInfoDialog;
