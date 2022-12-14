import React from "react";
import GHTKLogo from "../../../assets/images/GHTKLogo.webp";
import AhamoveLogo from "../../../assets/images/AhamoveLogo.png";
import GHNLogo from "../../../assets/images/GHNLogo.png";
import GrabExpressLogo from "../../../assets/images/GrabExpressLogo.png";
import PaypalLogo from "../../../assets/images/PayPalLogo.png";
import Image from "next/image";

interface IPartnetSection {}

const PartnerSection: React.FC<IPartnetSection> = (props) => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-gray-500 font-bold text-3xl text-center">
          Những đối tác tin tưởng của chúng tôi
        </h2>
        <p className="text-lg text-gray-500 font-normal text-center">
          Chúng tôi kết hợp với những đối tác sau đây để cho bạn trải nghiệm mua
          hàng tốt nhất
        </p>
      </div>
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-5 gap-x-5 gap-y-10">
        <div className="border border-gray-200 rounded-xl px-2 flex justify-center items-center cursor-pointer hover:bg-gray-100">
          <Image src={GHTKLogo} className="w-40 h-40" />
        </div>
        <div className="border border-gray-200 rounded-xl px-2 flex justify-center items-center cursor-pointer hover:bg-gray-100">
          <Image src={GHNLogo} />
        </div>
        <div className="border border-gray-200 rounded-xl px-2 flex justify-center items-center cursor-pointer hover:bg-gray-100">
          <Image src={AhamoveLogo} />
        </div>
        <div className="border border-gray-200 rounded-xl px-2 flex justify-center items-center cursor-pointer hover:bg-gray-100">
          <Image src={GrabExpressLogo} />
        </div>
        <div className="border border-gray-200 rounded-xl px-2 flex justify-center items-center cursor-pointer hover:bg-gray-100">
          <Image src={PaypalLogo} />
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
