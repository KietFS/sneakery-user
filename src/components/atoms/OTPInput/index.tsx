import React, { useState } from 'react'

interface IOTPInputProps {
  onChangeValue: (values: string) => void
  size?: 'small' | 'medium' | 'large'
}

const OtpInput: React.FC<IOTPInputProps> = ({ onChangeValue, size }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''))

  const sizes = {
    small:
      'w-[40px] h-[40px] text-center mr-2 text-lg border-gray-300 text-gray-600 rounded-lg',
    medium:
      'w-[60px] h-[60px] text-center mr-2 text-xl border-gray-300 text-gray-600 rounded-lg',
    large:
      'w-[80px] h-[80px] text-center mr-2 text-2xl border-gray-300 text-gray-600 rounded-lg',
  }

  const handleChange = (element: any, index: any) => {
    const value = element.value
    // Cập nhật giá trị cho ô hiện tại
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1, value.length)

    // Chuyển focus đến ô tiếp theo nếu giá trị được nhập và không phải là ô cuối cùng
    if (value && index < otp.length - 1) {
      const nextSibling = document.getElementById(`otp-${index + 1}`)
      if (nextSibling) {
        nextSibling.focus()
      }
    }

    setOtp(newOtp)
    // Gọi prop onChangeValue và truyền giá trị OTP hiện tại
    onChangeValue(newOtp.join(''))
  }

  const handlePaste = (e: any) => {
    e.preventDefault()
    const data = e.clipboardData.getData('text').slice(0, 6).split('')
    if (data.length === 6) {
      setOtp(data)
      onChangeValue(data.join(''))
    }
  }

  return (
    <div onPaste={handlePaste}>
      {otp.map((data, index) => {
        return (
          <input
            key={index}
            type="text"
            id={`otp-${index}`}
            value={data}
            onChange={e => handleChange(e.target, index)}
            onFocus={e => e.target.select()}
            maxLength={1}
            className={sizes[size || 'medium']}
            autoComplete="off"
          />
        )
      })}
    </div>
  )
}

export default OtpInput
