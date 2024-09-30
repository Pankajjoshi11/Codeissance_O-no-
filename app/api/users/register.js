import connectMongo from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, mobileNumber, userId, password } = req.body;

    // Validate input
    if (!name || !email || !mobileNumber || !userId || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Connect to the database
    const { db } = await connectMongo();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or userId already exists' });
    }

    // Create new user with plain text password
    const result = await db.collection('Users').insertOne({
      name,
      email,
      mobileNumber,
      userId,
      password, // Storing password as plain text (NOT RECOMMENDED)
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}