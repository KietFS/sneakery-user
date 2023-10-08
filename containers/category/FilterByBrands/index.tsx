import React, { useEffect, useState } from 'react'

//styles
import MultipleCheckBox from '@/designs/MultipleCheckBox'

//hooks
import { useAppDispatch } from '@/hooks/useRedux'

//utils
import { setBrand } from '@/redux/slices/filter'

interface IFilterByBrandsCheckBox {}

interface IBrand {
  id: string
  name: string
  value: string
}

const FilterByBrandsCheckBox: React.FC<IFilterByBrandsCheckBox> = props => {
  const {} = props
  const dispatch = useAppDispatch()

  //state
  const [listBrandSelected, setListBrandSelected] = useState<IBrand[]>([])

  //effect
  useEffect(() => {
    if (listBrandSelected) {
      dispatch(setBrand(listBrandSelected.map(item => item.value)))
    }
  }, [listBrandSelected])

  const brands: IBrand[] = [
    {
      id: '1',
      name: 'Nike',
      value: 'nike',
    },
    {
      id: '2',
      name: 'Adidas',
      value: 'adidas',
    },
    {
      id: '3',
      name: 'Reebok',
      value: 'reebok',
    },
    {
      id: '4',
      name: 'Puma',
      value: 'puma',
    },
    {
      id: '5',
      name: 'Louis Vuiton',
      value: 'lv',
    },
    {
      id: '6',
      name: 'Balenciaga',
      value: 'balenciaga',
    },
  ]

  return (
    <MultipleCheckBox
      listOptionSelected={listBrandSelected}
      options={brands}
      onSelect={options => setListBrandSelected(options)}
      label="Theo thương hiệu"
      keyLabel="name"
      keyValue="_id"
    />
  )
}

export default FilterByBrandsCheckBox
