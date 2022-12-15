import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import HeaderV2 from "../../components/HeaderV2";
import PaymentProcess from "../../assets/images/PaymentProcess.png";
import Image from "next/image";
import FooterSection from "../../components/FooterSection";
import Spinner from "../../components/Spinner";
import Button from "../../designs/Button";
import axios from "axios";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";

const Cancel: React.FC = (props) => {
  const router = useRouter();
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const { paymentId, token, PayerID } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [call, setCall] = useState<number>(0);

  const processCharge = async () => {
    try {
      setLoading(true);
      const url = `https://sneakery.herokuapp.com/api/paypal/deposit/success?paymentId=${paymentId}&payerId=${PayerID}`;
      console.log("URL", url);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      response && console.log("PROCESS CHARGE", response);
    } catch (error) {
      console.log("PROCESS CHARGE ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentId && PayerID) {
      setCall(call + 1);
      processCharge();
    }
  }, [paymentId]);

  useEffect(() => {
    console.log("CALLED", call);
  }, [call]);

  return (
    <>
      <div className="bg-white">
        <Head>
          <title>Sneakery - Xử lý nạp tiền</title>
        </Head>
        <div className="pb-16 bg-white">
          <HeaderV2 />
          <div className="mt-16 w-5/6 mx-auto border-gray-200 border rounded-lg h-[600px] bg-white">
            <div className="flex w-full justify-center items-center">
              <Image src={PaymentProcess} width={350} height={350} />
            </div>
            <h1 className="text-gray-500 font-bold text-2xl text-center mt-2">
              {loading
                ? "Vui lòng đợi chúng tôi đang xử lý giao dịch của bạn"
                : "Xử lý giao dịch thành công, tài khoản của bạn đã được cập nhật"}
            </h1>
            {loading && (
              <div className="flex items-center justify-center mt-4 laptop:mt-8">
                <Spinner />
              </div>
            )}

            <div
              className="flex justify-center items-center gap-x-2"
              onClick={() => router.push("/")}
            >
              <Button
                title="Quay về trang chủ"
                className={`mt-8 ${loading ? "opacity-50" : ""}`}
              />
            </div>
          </div>
          <FooterSection />
        </div>
      </div>
    </>
  );
};

export default Cancel;
