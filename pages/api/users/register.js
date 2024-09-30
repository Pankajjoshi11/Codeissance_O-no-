import connectMongo  from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectMongo();
    const { name, email, phone, userId, password } = req.body;

    if (!name || !email || !phone || !userId || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const existingUser = await User.findOne({ userId });
      if (existingUser) {
        return res.status(409).json({ error: 'User ID already exists' });
      }

      const newUser = new User({ name, email, phone, userId, password });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
