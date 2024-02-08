import React, { memo, useEffect, useState } from 'react'
import { Text } from '../Text'

interface Countdown {
  minutes: string
  seconds: string
}

const CountdownTimer = ({
  endDate,
  onCountDownEnd,
}: {
  endDate: string
  onCountDownEnd?: () => void
}) => {
  const [countdown, setCountdown] = useState<Countdown | null>(null)

  const calculateCountdown = () => {
    const targetDate = new Date(endDate)
    const now = new Date().getTime()
    let distance = targetDate.getTime() - now

    const timer = setInterval(() => {
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, '0')
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, '0')

      setCountdown({ minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
        setCountdown(null)
        onCountDownEnd && onCountDownEnd()
      } else {
        distance -= 1000
      }
    }, 1000)

    return () => clearInterval(timer)
  }

  useEffect(() => {
    calculateCountdown()
  }, [])

  return (
    <Text
      preset="small"
      weight="semiBold"
      text={countdown ? `${countdown?.minutes}:${countdown?.seconds}` : '00:00'}
    />
  )
}

export default memo(CountdownTimer)
