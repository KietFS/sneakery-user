import React from 'react'

//styles
import FilterByBrandsCheckBox from '@/containers/category/FilterByBrands'
import FilterByCategory from '@/containers/category/FilterByCategory'
import FilterByColors from '@/containers/category/FilterByColors'
import FilterByCondition from '@/containers/category/FilterByCondition'
import FilterByPrice from '@/containers/category/FilterByPrice'
import FilterBySize from '@/containers/category/FilterBySize'

interface IFilterSideBarProps {}

const FilterSideBar: React.FC<IFilterSideBarProps> = props => {
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
  )
}

export default FilterSideBar
