import React, { useEffect, useState } from 'react'

export const FadeInWrapper = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div
      className={`flex h-full w-full transition-opacity duration-350 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  )
}
