import { MenuItem, Select } from '@mui/material'
import React, { ReactNode, useRef } from 'react'
import { Control, Controller } from 'react-hook-form'

interface ISelectCustomFieldHookFormProps {
  name: string
  label: string
  control: Control<any>
  placeholder: string
  options: string[]
  onSelect: (option: string) => void
  renderOption?: (item: string[]) => ReactNode

  customStyles?: React.CSSProperties
}

const SelectCustomFieldHookForm: React.FC<
  ISelectCustomFieldHookFormProps
> = props => {
  const {
    name,
    label,
    placeholder,
    control,
    options,
    renderOption,
    onSelect,
    customStyles,
  } = props
  const ref = useRef()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
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
                value={value}
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
                      {value}
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
                        value={option}
                        onClick={() => {
                          onSelect(option)
                          onChange(option)
                        }}
                        key={index.toString()}
                      >
                        {option}
                      </MenuItem>
                    ))}
              </Select>
            </div>
            {error && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                {error?.message}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default SelectCustomFieldHookForm
