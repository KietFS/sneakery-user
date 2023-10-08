import React, { useEffect, useState } from 'react'

//styles
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

//hooks
import { useDispatch } from 'react-redux'

//utils and types
import { setColor } from '@/redux/slices/filter'

interface IFilterByColorsProps {}

const FilterByColors: React.FC<IFilterByColorsProps> = props => {
  const [listColor, setListSize] = useState<string[]>([
    'white',
    'silver',
    'gray',
    'black',
    'denim',
    'cream',
    'red',
    'pink',
    'green',
    'yellow',
    'brown',
  ])

  //states
  const [colorSelected, setColorSelected] = useState<string[]>([])
  const [openBelow, setOpenBelow] = useState<boolean>(true)
  const dispatch = useDispatch()

  //effects
  useEffect(() => {
    if (colorSelected) {
      dispatch(setColor(colorSelected.map(item => item)))
    }
  }, [colorSelected])

  return (
    <div className="mt-4">
      <div
        className="flex gap-x-1 items-center hover:opacity-60 cursor-pointer"
        onClick={() => setOpenBelow(!openBelow)}
      >
        <p className="text-gray-600 text-lg font-semibold">Theo màu</p>
        {!openBelow ? (
          <ChevronDownIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronUpIcon className="w-6 h-6 text-gray-600" />
        )}
      </div>
      {openBelow ? (
        <div className="grid grid-cols-4 gap-x-0 mt-2">
          {listColor.map(item => (
            <div
              className={`h-10 border border-gray-200 ${
                colorSelected.includes(item) ? 'p-2 border bg-blue-50' : ''
              } w-full flex justify-center items-center cursor-pointer `}
              onClick={() =>
                colorSelected.includes(item)
                  ? setColorSelected(
                      colorSelected.filter(temp => temp !== item),
                    )
                  : setColorSelected([...colorSelected, item])
              }
            >
              <p className="text-gray-600 text-center text-xs">
                {item.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FilterByColors
