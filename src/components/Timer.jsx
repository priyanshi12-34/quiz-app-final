import React, { useEffect, useState } from 'react'

export default function Timer({ duration = 30, onTimeout, resetKey, active = true }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(duration)
  }, [resetKey, duration])

  // Countdown logic
  useEffect(() => {
    if (!active) return

    if (timeLeft <= 0) {
      onTimeout()  // automatically go to next question
      return
    }

    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, active, onTimeout])

  const progressPercent = (timeLeft / duration) * 100
  const isWarning = timeLeft <= 7 // warning

  return (
    <div className="timer-bar-container-short">
      <div
        className={`timer-bar-fill-short ${isWarning ? 'warning' : ''}`}
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  )
}
