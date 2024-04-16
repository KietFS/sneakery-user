import React, { useEffect, useState } from 'react'

//styles
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

//hooks
import { useDispatch } from 'react-redux'

//utils
import { setSize } from '@/redux/slices/filter'
import { debounce } from 'lodash'

interface IFilterBySizeProps {}

const FilterBySize: React.FC<IFilterBySizeProps> = props => {
  //state
  const [listSize, setListSize] = useState<number[]>([
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
  ])
  const [sizeSelected, setSizeSelected] = useState<number[]>([])
  const [openBelow, setOpenBelow] = useState<boolean>(true)

  //dispatch
  const dispatch = useDispatch()

  //effect
  useEffect(() => {
    const debouncedDispatch = debounce(() => {
      dispatch(setSize(sizeSelected.map(item => `${item}`)))
    }, 2000)

    if (sizeSelected) {
      debouncedDispatch()
    }

    // Clean up function
    return () => {
      debouncedDispatch.cancel()
    }
  }, [sizeSelected])

  return (
    <div className="mt-4">
      <div
        className="flex gap-x-1 items-center hover:opacity-60 cursor-pointer"
        onClick={() => setOpenBelow(!openBelow)}
      >
        <p className="text-gray-600 text-lg font-semibold">Theo size</p>
        {!openBelow ? (
          <ChevronDownIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronUpIcon className="w-6 h-6 text-gray-600" />
        )}
      </div>
      {openBelow ? (
        <div className="grid grid-cols-6 gap-x-0 mt-2">
          {listSize.map(item => (
            <div
              className={`h-10 border border-gray-200 ${
                sizeSelected.includes(item) ? 'bg-blue-50' : ''
              } w-full flex justify-center items-center cursor-pointer `}
              onClick={() =>
                sizeSelected.includes(item)
                  ? setSizeSelected(sizeSelected.filter(temp => temp !== item))
                  : setSizeSelected([...sizeSelected, item])
              }
            >
              <p className="text-gray-600 text-center text-sm">{item}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FilterBySize
