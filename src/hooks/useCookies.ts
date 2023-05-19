import { useState } from 'react'
import { getCookie } from 'typescript-cookie'

const useCookies = () => {
  const [accessToken, setAccessToken] = useState()
  const getRefreshToken = () => {
    return getCookie('')
  }
  return {
    accessToken,
    setAccessToken,
    getRefreshToken
  }
}

export default useCookies
