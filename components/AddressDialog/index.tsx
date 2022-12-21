import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import InputText from "../../designs/InputText";
import Button from "../../designs/Button";
import axios from "axios";
import SelectComponent from "../Select";
import RichTextInput from "../../designs/RichTextInput";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import { IAddressResponse } from "../../containers/createProduct/LeftSide";

interface IFormValue {
  ward?: string;
  district?: string;
  addressDetail?: string;
}

export interface IAddressDialogProps {
  open: boolean;
  onClose: () => void;
}

interface IDistrict {
  id: string;
  name: string;
}

interface IWard {
  id: string;
  name: string;
}

function AddressDialog(props: IAddressDialogProps) {
  const { open, onClose } = props;
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
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
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const [address, setAddress] = React.useState<IAddressResponse[]>([]);
  const [isInitialAddress, setIsInitialAddress] =
    React.useState<boolean>(false);

  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
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
      onClose();
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
    if (address) {
      setIsInitialAddress(true);
      setInitialValues({
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
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddressDialog;
