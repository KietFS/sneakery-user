import React, { useState } from "react";
import FilterByBrandsCheckBox from "../FilterByBrands";
import FilterByCategory from "../FilterByCategory";
import FilterByColors from "../FilterByColors";
import FilterByCondition from "../FilterByCondition";
import FilterByPrice from "../FilterByPrice";
import FilterBySize from "../FilterBySize";

interface IFilterSideBarProps {}

const FilterSideBar: React.FC<IFilterSideBarProps> = (props) => {
  return (
    <div className="h-fit rounded-lg shadow-sm border-gray-200 border bg-white px-4 py-8">
      <h3 className="text-xl laptop:text-2xl text-gray-500 font-bold">
        Lọc sản phẩm
      </h3>
      <div className="flex flex-col gap-y-5 mt-5">
        <FilterByCategory />
        <FilterByCondition />
        <FilterByPrice />
        <FilterByBrandsCheckBox />
        <FilterBySize />
        <FilterByColors />
      </div>
    </div>
  );
};

export default FilterSideBar;
