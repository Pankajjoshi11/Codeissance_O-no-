import { connectToDatabase } from '../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectToDatabase();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const user = await User.create({ email, password });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate email
        res.status(400).json({ error: 'Email already in use' });
      } else {
        res.status(500).json({ error: 'Error registering user' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
