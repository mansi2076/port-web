// ScrambledText.js
import React, { useState, useEffect } from 'react'

const ScrambledText = ({ children, radius = 100, duration = 1, speed = 0.5, scrambleChars = '!@#$%^&*', className = '' }) => {
  const [text, setText] = useState(children)
  const [scrambledText, setScrambledText] = useState('')
  
  useEffect(() => {
    setText(children)
    scrambleAnimation()
  }, [children])

  const scrambleAnimation = () => {
    let iteration = 0
    const originalText = text
    const length = originalText.length
    
    const interval = setInterval(() => {
      setScrambledText(originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          if (char === ' ') return ' '
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        })
        .join(''))
      
      if (iteration >= length) clearInterval(interval)
      iteration += speed
    }, duration * 10)
    
    return () => clearInterval(interval)
  }

  return (
    <span className={className}>
      {scrambledText || text}
    </span>
  )
}

export default ScrambledText