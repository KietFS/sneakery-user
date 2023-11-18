import React from "react";

interface IFooterSectionProps {}

const FooterSection: React.FC<IFooterSectionProps> = (props) => {
  return (
    <div className="py-10 px-8 laptop:px-28 bg-gray-50 h-fit mt-40 laptop:mt-20">
      <div className="space-y-5">
        <div>
          <h2 className="text-blue-500 font-bold text-3xl text-left">
            Sneakery Aution
          </h2>
          <p className="text-lg text-gray-500 font-normal text-left">
            2022 - Designed and Developed by HKMN Group - All rights reserve
          </p>
        </div>
        <div className="grid grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-6 gap-x-10 gap-y-10">
          <div className="space-y-2">
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Điều khoản
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Chính sách bảo mật
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Trần Quốc Siêu
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Võ Huỳnh anh Nhật
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Điều khoản
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Chính sách bảo mật
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Trần Quốc Siêu
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Võ Huỳnh anh Nhật
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Điều khoản
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Chính sách bảo mật
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Trần Quốc Siêu
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Võ Huỳnh anh Nhật
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Điều khoản
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Chính sách bảo mật
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Trần Quốc Siêu
            </p>
            <p className="text-sm text-gray-400 font-normal text-left hover:text-gray-700 cursor-pointer">
              Võ Huỳnh anh Nhật
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
