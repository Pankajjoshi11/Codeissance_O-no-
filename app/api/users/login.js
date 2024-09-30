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
      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        res.status(200).json({ message: 'Login successful' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error logging in user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
