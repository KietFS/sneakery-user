import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import React, { ReactNode, useState } from "react";

interface IRadioButtonProps<T = any> {
  label: string;
  options: T[];
  optionSelected: T;
  onSelect: (item: T) => void;
  renderOption?: (item: T) => ReactNode;
  keyLabel: string;
  keyValue: string;
}

const RadioButton: React.FC<IRadioButtonProps> = (props) => {
  const {
    label,
    optionSelected,
    onSelect,
    renderOption,
    keyLabel,
    keyValue,
    options,
  } = props;
  const [openBelow, setOpenBelow] = useState<boolean>(true);
  return (
    <div className="mt-4">
      <div
        className="flex gap-x-1 items-center hover:opacity-60 cursor-pointer"
        onClick={() => setOpenBelow(!openBelow)}
      >
        <p className="text-gray-600 text-lg font-semibold">{label}</p>
        {!openBelow ? (
          <ChevronDownIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronUpIcon className="w-6 h-6 text-gray-600" />
        )}
      </div>
      {openBelow ? (
        <div className="flex flex-col mt-2 gap-y-2">
          {options?.map((option) => (
            <div
              className="flex flex-row gap-x-3 cursor-pointer items-center text-gray-500 justify-between"
              onClick={() =>
                optionSelected?.[keyValue] === option?.[keyValue]
                  ? onSelect(null)
                  : onSelect(option)
              }
            >
              <p className="text-gray-600 text-sm">{option?.[keyLabel]}</p>
              {optionSelected?.[keyValue] === option?.[keyValue] ? (
                <div className="w-4 h-4 rounded-full border border-blue-500 bg-white justify-center items-center flex">
                  <div className="w-3 h-3 mx-auto bg-blue-500 rounded-full" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border border-gray-500 bg-white justify-center items-center flex">
                  <div className="w-3 h-3 mx-auto bg-white rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RadioButton;
