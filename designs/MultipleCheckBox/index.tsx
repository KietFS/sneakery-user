import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useState } from "react";
import { isEqual } from "../../utils/prototype";

interface IMultipleCheckBoxProps<T = any> {
  label: string;
  options: T[];
  renderOption?: (option: T) => ReactNode;
  listOptionSelected: T[];
  onSelect: (items: T[]) => void;
  keyValue: string;
  keyLabel: string;
}

const MultipleCheckBox: React.FC<IMultipleCheckBoxProps> = (props) => {
  const {
    label,
    options,
    renderOption,
    keyLabel,
    keyValue,
    listOptionSelected,
    onSelect,
  } = props;
  const [openBelow, setOpenBelow] = useState<boolean>(true);

  const handleAddItem = (item: any) => {
    onSelect([...listOptionSelected, item]);
  };

  const handleRemoveItem = (item: any) => {
    const temp = listOptionSelected.filter((option) => !isEqual(option, item));
    onSelect(temp);
  };

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
                listOptionSelected?.has(option)
                  ? handleRemoveItem(option)
                  : handleAddItem(option)
              }
            >
              <p className="text-gray-600 text-sm">{option[keyLabel]}</p>
              {listOptionSelected.has(option) ? (
                <div className="w-4 h-4 rounded-sm border border-blue-500 bg-blue-500 justify-center items-center flex">
                  <CheckIcon className="w-3 h-3 mx-auto text-white font-bold" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white justify-center items-center flex">
                  <CheckIcon className="w-3 h-3 mx-auto text-white font-bold" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MultipleCheckBox;
