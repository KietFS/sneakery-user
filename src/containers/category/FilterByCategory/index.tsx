import React, { useEffect, useState } from 'react'

//styles
import RadioButton from '@/designs/RadioButton'

//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useDispatch } from 'react-redux'

//utils and types
import { IRootState } from '@/redux'
import { setCategory } from '@/redux/slices/filter'

interface IFilterCategoryProps {}

interface ICategory {
  id: string
  name: string
}

const FilterByCategory: React.FC<IFilterCategoryProps> = props => {
  const categoryList: ICategory[] = [
    {
      id: 'nam',
      name: 'Nam',
    },
    {
      id: 'nu',
      name: 'Nữ',
    },
    {
      id: 'unisex',
      name: 'Unisex',
    },
  ]
  const { category } = useAppSelector((state: IRootState) => state.filter)
  const [categorySelected, setCategorySelected] = useState<ICategory | null>(
    null,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (category) {
      categoryList.map(item => {
        if (item.id === category) {
          setCategorySelected(item)
        }
      })
    }
  }, [category])

  useEffect(() => {
    if (categorySelected !== null) {
      dispatch(setCategory(categorySelected.id))
    } else {
      dispatch(setCategory(null))
    }
  }, [categorySelected])

  return (
    <RadioButton
      options={categoryList}
      optionSelected={categorySelected}
      onSelect={category => setCategorySelected(category)}
      label="Theo danh mục"
      keyValue="id"
      keyLabel="name"
    />
  )
}

export default FilterByCategory
