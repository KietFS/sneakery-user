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

interface IFormValue {
  name: string;
  phoneNumber: string;
}

export interface IAccountDialogProps {
  open: boolean;
  onClose: () => void;
  product?: IProduct;
}

function OrderShippingInfoDialog(props: IAccountDialogProps) {
  const { open, onClose, product } = props;
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    name: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [initialLoading, setInitialLoading] = React.useState<boolean>(false);
  const [districtError, setDistrictError] = React.useState<string>("");
  const [wardError, setWardError] = React.useState<string>("");

  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({
      name: yup.string().required("Vui lòng điền tên của bạn"),
      phoneNumber: yup.string().required("Vui lòng nhập số điện thoại của bạn"),
    });

  const handleSubmit = async (values: IFormValue) => {
    try {
      setLoading(true);
      console.log("VALUES HERE", values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
                      Quản lý thông tin tài khoản của bạn
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
