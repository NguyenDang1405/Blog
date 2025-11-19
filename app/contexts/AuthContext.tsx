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
  login: (email: string, password: string) => Promise<void>
  register: (email: string, name: string, password: string) => Promise<void>
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
  const loginMutation = useMutation(api.users.login)
  const registerMutation = useMutation(api.users.register)
  const updateUser = useMutation(api.users.updateUser)
  const getUserByEmail = useQuery(api.users.getUserByEmail, 
    user ? { email: user.email } : "skip"
  )

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      
      // Gọi mutation login
      const userData = await loginMutation({
        email,
        password
      })

      if (!userData) {
        throw new Error('Đăng nhập thất bại')
      }

      // Lưu vào localStorage
      localStorage.setItem('blog_user', JSON.stringify(userData))
      setUser(userData as User)
      
    } catch (error: any) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, name: string, password: string) => {
    try {
      setIsLoading(true)
      
      // Gọi mutation register
      const userId = await registerMutation({
        email,
        name,
        password
      })

      // Sau khi đăng ký thành công, tự động đăng nhập
      const userData = await loginMutation({
        email,
        password
      })

      if (!userData) {
        throw new Error('Đăng ký thành công nhưng đăng nhập thất bại')
      }

      // Lưu vào localStorage
      localStorage.setItem('blog_user', JSON.stringify(userData))
      setUser(userData as User)
      
    } catch (error: any) {
      console.error('Register error:', error)
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
    register,
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
