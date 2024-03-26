import * as React from 'react'

//styles
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

//hooks
import { useDispatch } from 'react-redux'

//utils
import { setPriceEnd, setPriceStart } from '@/redux/slices/filter'

function valuetext(value: number) {
  return `${value}°C`
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([0, 0])
  const [openBelow, setOpenBelow] = React.useState<boolean>(false)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 10,
      label: '1k$',
    },
    {
      value: 20,
      label: '2000$',
    },
    {
      value: 50,
      label: '5000$',
    },
    {
      value: 80,
      label: '8000$',
    },
    {
      value: 100,
      label: '10k$',
    },
  ]

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (value[0] === 0) {
      dispatch(setPriceStart('0'))
    } else {
      dispatch(setPriceStart(`${value[0].toString()}00`))
    }
    if (value[1] === 0) {
      dispatch(setPriceEnd('0'))
    } else {
      dispatch(setPriceEnd(`${value[1].toString()}00`))
    }
  }, [value])

  React.useEffect(() => {
    dispatch(setPriceEnd(null))
    dispatch(setPriceStart(null))
  }, [])

  return (
    <div className="w-full mt-5">
      <div
        className="flex gap-x-1 items-center hover:opacity-60 cursor-pointer"
        onClick={() => setOpenBelow(!openBelow)}
      >
        <p className="text-gray-600 text-lg font-semibold">Theo giá sản phẩm</p>
        {!openBelow ? (
          <ChevronDownIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronUpIcon className="w-6 h-6 text-gray-600" />
        )}
      </div>
      {openBelow ? (
        <Box sx={{ width: '92%', mx: 'auto', mt: 1 }}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            aria-label="Custom marks"
            step={1}
            marks={marks}
            size="small"
          />
        </Box>
      ) : null}
    </div>
  )
}
