// /pages/api/users/login.js

import  connectMongo  from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectMongo();

    const { userId, password } = req.body;

    // Validate input
    if (!userId || !password) {
      return res.status(400).json({ error: 'User ID and password are required' });
    }

    try {
      // Find the user by userId
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the password matches
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Authentication successful
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
