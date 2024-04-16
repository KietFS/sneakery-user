import React, { ReactNode, useRef } from 'react'

//styles
import { Select, MenuItem } from '@mui/material'

interface ISelectProps<T = any> {
  name: string
  label: string
  placeholder: string
  options: T[]
  optionSelected: T
  onSelect: (option: T) => void
  keyValue?: string
  keyLabel?: string
  renderOption?: (item: T[]) => ReactNode
  error?: string
  customStyles?: React.CSSProperties
}

const SelectComponent: React.FC<ISelectProps> = props => {
  const ref = useRef()
  const {
    name,
    label,
    placeholder = '',
    options,
    optionSelected,
    keyValue = 'id',
    keyLabel = 'name',
    onSelect,
    renderOption,
    error = '',
  } = props

  return (
    <div className="flex flex-col gap-y-1">
      <p className="text-sm font-bold text-gray-600 mb-1 mr-1">{label}</p>
      <div className="max-h-[200px]">
        <Select
          MenuProps={{
            style: {
              maxHeight: 400,
            },
          }}
          ref={ref}
          name={name}
          placeholder={placeholder}
          value={optionSelected}
          style={{
            width: '100%',
            height: 40,
            borderWidth: 0,
            borderColor: 'transparent',
            background: '#f3f4f6',
            borderRadius: 7,
            maxHeight: '200px',
            ...props.customStyles,
          }}
          renderValue={value => (
            <div className="flex h-full items-center">
              <p className="text-gray-900 text-sm items-center  ">
                {value[keyLabel]}
              </p>
            </div>
          )}
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            height: '40px',
            maxHeight: '200px',
          }}
        >
          {renderOption
            ? renderOption(options)
            : options?.map((option, index) => (
                <MenuItem
                  value={option[keyValue]}
                  onClick={() => onSelect(option)}
                  key={index.toString()}
                >
                  {option[keyLabel]}
                </MenuItem>
              ))}
        </Select>
      </div>
      {error && (
        <p className="text-red-500 text-xs font-semibold mt-1">{error}</p>
      )}
    </div>
  )
}

export default SelectComponent
