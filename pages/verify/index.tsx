import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import VerifyingEmail from "../../assets/images/VerifyingEmail.png";
import Image from "next/image";
import Spinner from "../../components/Spinner";
import Button from "../../designs/Button";
import axios from "axios";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";

const Verify: React.FC = (props) => {
  const router = useRouter();
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const { code } = router.query;
  const [loading, setLoading] = useState<boolean>(false);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      const url = `https://sneakery.herokuapp.com/api/auth/verify/${code}`;
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
    if (code) {
      verifyEmail();
    }
  }, [code]);

  return (
    <>
      <div className="bg-white">
        <Head>
          <title>Sneakery - Xác thực email</title>
        </Head>
        <div className="pb-16 bg-white">
          <div className="mt-16 w-5/6 mx-auto border-gray-200 border rounded-lg h-[600px] bg-white py-4">
            <p
              className="text-[40px] font-bold text-blue-500 w-full cursor-pointer text-center"
              onClick={() => router.push("/")}
            >
              Sneakery
            </p>
            <div className="flex w-full justify-center items-center">
              <Image src={VerifyingEmail} width={350} height={350} />
            </div>
            <h1 className="text-gray-500 font-bold text-2xl text-center mt-2">
              {loading
                ? "Hãy đợi chúng tôi xác minh email của bạn"
                : "Xác minh email thành công, nhấn vào nút ở dưới để quay về trang chủ"}
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
                onClick={() => router.push("/")}
                title="Quay về trang chủ"
                className={`mt-8 ${loading ? "opacity-50" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
