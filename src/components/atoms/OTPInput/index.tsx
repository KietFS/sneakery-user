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
    // Update the current input value
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1, value.length)

    // Move focus to the next input if value is entered and it's not the last input
    if (value && index < otp.length - 1) {
      const nextSibling = document.getElementById(`otp-${index + 1}`)
      if (nextSibling) {
        nextSibling.focus()
      }
    }

    setOtp(newOtp)
    // Call prop onChangeValue with the current OTP value
    onChangeValue(newOtp.join(''))
  }

  const handleKeyDown = (element: any, index: any) => {
    if (element.key === 'Backspace') {
      // Check if the current input is empty and move focus to the previous input
      if (otp[index] === '' && index > 0) {
        const prevSibling = document.getElementById(`otp-${index - 1}`)
        if (prevSibling) {
          prevSibling.focus()
        }
      }
    }
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
            onKeyDown={e => handleKeyDown(e, index)}
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
