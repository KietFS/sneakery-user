import React, { useEffect, useState } from 'react'

interface ISmallCountTimerProps {
  bidClosingDate: string
}

const SmallCountdownTimer: React.FC<ISmallCountTimerProps> = props => {
  let newBidClosingDate = new Date(props.bidClosingDate)

  //state
  const [textDay, setTextDay] = useState<string>('')
  const [textHour, setTextHour] = useState<string>('')
  const [textMinute, setTextMinute] = useState<string>('')
  const [textSecond, setTextSecond] = useState<string>('')

  const isDisable = Date.now() > new Date(props.bidClosingDate)?.getTime()

  //functions
  useEffect(() => {
    const countdown = () => {
      const countDate = newBidClosingDate.getTime()
      const now = new Date().getTime()
      const gap = countDate - now
      const second = 1000
      const minute = second * 60
      const hour = minute * 60
      const day = hour * 24
      const textDay = Math.floor(gap / day)
      setTextDay(textDay.toString())
      const textHour = Math.floor((gap % day) / hour)
      setTextHour(textHour.toString())
      const textMinute = Math.floor((gap % hour) / minute)
      setTextMinute(textMinute.toString())
      const textSecond = Math.floor((gap % minute) / second)
      setTextSecond(textSecond.toString())
    }
    const intervalId = setInterval(countdown, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [props.bidClosingDate]) // thêm props.bidClosingDate vào dependency array

  return (
    <div className="flex items-center justify-center">
      {isDisable ? null : (
        <p className="text-xs text-gray-500 font-normal text-center mr-1">
          Còn
        </p>
      )}
      {isDisable ? (
        <p className="text-gray-500 ml-1 text-xs  cursor-pointer">
          Sản phẩm đã hết phiên đấu giá
        </p>
      ) : (
        <p className="text-red-500 ml-1 text-xs text-center  cursor-pointer">
          {`${textDay} ngày : ${textHour} giờ : ${textMinute} phút : ${textSecond} giây`}
        </p>
      )}
    </div>
  )
}

export default SmallCountdownTimer
