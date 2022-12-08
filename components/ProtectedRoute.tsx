import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/authContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/welcome')
    }
  }, [router, user])

  return <>{user ? children : null}</>
}

export default ProtectedRoute