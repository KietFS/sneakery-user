import * as React from 'react'

//styles
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

//hooks
import { useDispatch } from 'react-redux'

//utils
import { setSortType } from '@/redux/slices/filter'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

const SelectSortType = () => {
  const [sortTypeSelected, setSortTypeSelected] = React.useState<string | null>(
    null,
  )
  const handleChange = (event: SelectChangeEvent<typeof sortTypeSelected>) => {
    setSortTypeSelected(event.target.value)
  }
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (sortTypeSelected !== null) {
      dispatch(setSortType(sortTypeSelected))
    }
  }, [sortTypeSelected])

  return (
    <div>
      <FormControl>
        <Select
          displayEmpty
          onChange={handleChange}
          className="outline-none border-0"
          style={{
            border: 0,
            height: 45,
            borderWidth: 0,
            borderColor: 'transparent',
            borderRadius: 7,
          }}
          input={<OutlinedInput />}
          renderValue={() => (
            <div className="flex justify-between items-center py-4">
              <p className="text-gray-600 font-semibold">
                {sortTypeSelected == 'bid.priceStart,desc' &&
                  'Giá cao đến thấp'}
                {sortTypeSelected == 'bid.priceStart,asc' && 'Giá thấp đến cao'}
                {sortTypeSelected == 'bid.closingDateTime,desc' && 'Mới nhất'}
                {sortTypeSelected == 'name,asc' && 'Theo bảng chữ cái'}
                {sortTypeSelected == null && 'Sắp xếp theo'}
              </p>
            </div>
          )}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => setSortTypeSelected('bid.priceStart,desc')}
          >
            <p className="text-gray-500 text-sm ">Giá cao đến thấp</p>
            <ArrowLongDownIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => setSortTypeSelected('bid.priceStart,asc')}
          >
            <p className="text-gray-500 text-sm ">Giá thấp đến cao</p>
            <ArrowLongUpIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => setSortTypeSelected('bid.closingDateTime,desc')}
          >
            <p className="text-gray-500 text-sm ">Mới nhất</p>
            <ClockIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => setSortTypeSelected('name,asc')}
          >
            <p className="text-gray-500 text-sm ">Bảng chữ cái</p>
          </div>
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectSortType
