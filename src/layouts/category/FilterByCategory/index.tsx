import React, { useEffect, useState } from 'react'

//styles
import RadioButton from '@/components/atoms/RadioButton'

//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useDispatch } from 'react-redux'

//utils and types
import { IRootState } from '@/redux'
import { setCategory } from '@/redux/slices/filter'
import axios from 'axios'
import { Config } from '@/config/api'

interface IFilterCategoryProps {}

const FilterByCategory: React.FC<IFilterCategoryProps> = props => {
  const [categoryList, setCategoryList] = useState<IProductCategory[]>([])
  const [isGettingProductCategory, setIsGettingProductCategory] =
    useState<boolean>(false)
  const dispatch = useDispatch()

  React.useEffect(() => {
    getProductCategories()
  }, [])

  const getProductCategories = async () => {
    try {
      setIsGettingProductCategory(true)
      const response = await axios.get(`${Config.API_URL}/categories/`)

      if (response?.data?.success) {
        //SET CATEGORIES
        setIsGettingProductCategory(false)
        setCategoryList(response?.data?.data)
      }
    } catch (error) {
      setIsGettingProductCategory(false)
    }
  }
  const { category } = useAppSelector((state: IRootState) => state.filter)

  return (
    <RadioButton
      options={categoryList}
      optionSelected={category}
      onSelect={category => dispatch(setCategory(category))}
      label="Theo danh mục"
      keyValue="id"
      keyLabel="name"
    />
  )
}

export default FilterByCategory
