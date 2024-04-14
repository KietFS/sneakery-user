import React, { useEffect, useState } from 'react'

interface ICountDownTimer {
  bidClosingDate: string
}

const CountDownTimer: React.FC<ICountDownTimer> = props => {
  let newBidClosingDate = new Date(props.bidClosingDate)

  //state
  const [textDay, setTextDay] = useState<string>('')
  const [textHour, setTextHour] = useState<string>('')
  const [textMinute, setTextMinute] = useState<string>('')
  const [textSecond, setTextSecond] = useState<string>('')

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
  }, [])
  return (
    <>
      <h3 className="text-gray-400 text-lg">Ngày hết hạn : </h3>
      <h3 className="text-red-500 ml-1 text-lg  cursor-pointer">
        {`${textDay} ngày : ${textHour} giờ : ${textMinute} phút : ${textSecond} giây`}
      </h3>
    </>
  )
}

export default CountDownTimer
