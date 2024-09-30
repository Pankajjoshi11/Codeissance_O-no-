// /app/api/users/login.js

import User from '@/models/User'
import connectMongo from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { userId, password } = req.body

  try {
    await connectMongo()

    // Find the user by userId
    const user = await User.findOne({ userId })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Authentication successful
    res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
