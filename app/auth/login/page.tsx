'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the userId and password to your backend for verification
    console.log('Login attempt with:', { userId, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717] text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#222222] p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#4f47e6]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium mb-2">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 bg-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f47e6] transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f47e6] transition duration-200"
              required
            />
          </div>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#4f47e6] text-white py-2 px-4 rounded-md hover:bg-[#3f37d6] transition duration-200"
            >
              Log In
            </motion.button>
          </Link>
          
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-[#4f47e6] hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}