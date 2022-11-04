import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";

interface IInputSearchProps {}

const InputSearch: React.FC<IInputSearchProps> = (props) => {
  return (
    <div className="border-gray-100  border rounded-xl px-4 items-center flex h-10 w-full bg-gray-100">
      <input
        className="h-8 w-full bg-gray-100"
        placeholder="Tìm kiếm theo tên giày, thương hiệu,..."
      />
      <MagnifyingGlassIcon className="h-6 w-6 text-secondary-500 " />
    </div>
  );
};

export default InputSearch;
