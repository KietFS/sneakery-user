import React, { useEffect, useState } from 'react'

//styles
import RadioButton from '@/designs/RadioButton'

//hooks
import { useDispatch } from 'react-redux'

//utils
import { setCondition } from '@/redux/slices/filter'

interface IFilterByConditionProps {}

interface ICondition {
  id: string
  name: string
}

const FilterByCondition: React.FC<IFilterByConditionProps> = props => {
  const listCondition: ICondition[] = [
    {
      id: 'FULLBOX',
      name: 'Full box',
    },
    {
      id: 'USED',
      name: 'Đã qua sử dụng',
    },
  ]
  const [conditionSelected, setConditionSelected] = useState<ICondition | null>(
    null,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (conditionSelected !== null) {
      dispatch(setCondition(conditionSelected.id))
    } else {
      dispatch(setCondition(null))
    }
  }, [conditionSelected])

  return (
    <RadioButton
      options={listCondition}
      optionSelected={conditionSelected}
      label="Theo tình trạng"
      keyLabel="name"
      keyValue="id"
      onSelect={option => setConditionSelected(option)}
    />
  )
}

export default FilterByCondition
