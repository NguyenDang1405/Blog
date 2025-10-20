'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

interface User {
  _id: Id<"users">
  email: string
  name: string
  avatar?: string
  role?: string
  isActive?: boolean
  createdAt: number
  lastLoginAt?: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, name: string) => Promise<void>
  logout: () => void
  updateProfile: (data: { name?: string; avatar?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Lấy user từ localStorage khi component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('blog_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('blog_user')
      }
    }
    setIsLoading(false)
  }, [])

  // Mutations
  const createUser = useMutation(api.users.createUser)
  const updateUser = useMutation(api.users.updateUser)
  const updateLastLogin = useMutation(api.users.updateLastLogin)
  const getUserByEmail = useQuery(api.users.getUserByEmail, 
    user ? { email: user.email } : "skip"
  )

  const login = async (email: string, name: string) => {
    try {
      setIsLoading(true)
      
      // Tạo user mới (hoặc lấy user hiện tại)
      const userId = await createUser({
        email,
        name,
        role: 'user'
      })
      
      // Cập nhật last login
      await updateLastLogin({ id: userId })

      // Lưu vào localStorage
      const userData = {
        _id: userId,
        email,
        name,
        role: 'user',
        isActive: true,
        createdAt: Date.now(),
        lastLoginAt: Date.now()
      }
      
      localStorage.setItem('blog_user', JSON.stringify(userData))
      setUser(userData)
      
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('blog_user')
    setUser(null)
  }

  const updateProfile = async (data: { name?: string; avatar?: string }) => {
    if (!user) return

    try {
      const updatedUser = await updateUser({
        id: user._id,
        ...data
      })

      if (updatedUser) {
        const userData = { ...user, ...updatedUser }
        localStorage.setItem('blog_user', JSON.stringify(userData))
        setUser(userData)
      }
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
