import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import InputBid from "../../designs/InputNumber";
import Button from "../../designs/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";

interface IFormValue {
  amount?: string;
}

export interface IBidDialogProps {
  open: boolean;
  onClose: () => void;
  product: IProduct;
}

function BidDialog(props: IBidDialogProps) {
  const { open, onClose, product } = props;
  const [initialValues, setInitialValues] = React.useState<IFormValue>({
    amount: product.startPrice.toString(),
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const validationSchema = yup
    .object()
    .shape<{ [k in keyof IFormValue]: any }>({});

  const handleSubmit = async (values: IFormValue) => {
    console.log("Submitted");
    if (Number(values?.amount) < product.startPrice) {
      setError("Vui lòng nhập bid cao hơn mức bid hiện tại !");
    } else {
      try {
        setLoading(true);
        const data = await axios.post(
          "https://sneakery.herokuapp.com/api/bids",
          {
            amount: Number(values.amount?.split(",").join("")),
            productId: Number(product.id),
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (data) {
          toast.success("Bid sản phẩm thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          onClose();
        } else {
          toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          onClose();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
                    <h1 className="text-gray-600 font-bold text-2xl">
                      Nhập thông tin đấu giá của bạn
                    </h1>
                  </div>
                  <InputBid
                    name="amount"
                    value={initialValues?.amount}
                    label="Mức ra giá của bạn"
                    placeholder="Nhập mức ra giá của bạn"
                    bidError={error}
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

export default BidDialog;
