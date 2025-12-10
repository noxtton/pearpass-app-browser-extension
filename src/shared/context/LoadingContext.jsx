import React, { createContext, useState, useContext, useEffect } from 'react'

import { LoadingOverlay } from '../components/LoadingOverlay'

const LoadingContext = createContext()

/**
 * @param {{
 *  children: import('react').ReactNode
 * }} props
 */
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <>
        {children}
        {isLoading && <LoadingOverlay />}
      </>
    </LoadingContext.Provider>
  )
}

/**
 * @returns {{
 *  isLoading: boolean,
 *  setIsLoading: (isLoading: boolean) => void
 * }}
 */
export const useLoadingContext = () => useContext(LoadingContext)

/**
 * @param {{
 *  isLoading: boolean
 * }} props
 */
export const useGlobalLoading = ({ isLoading }) => {
  const { setIsLoading } = useLoadingContext()

  useEffect(() => {
    if (typeof isLoading !== 'boolean') {
      return
    }

    setIsLoading(isLoading)

    return () => {
      setIsLoading(false)
    }
  }, [isLoading])
}
