import connectMongo from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    await connectMongo();
    res.status(200).json({ status: 'success', message: 'Connected to the database' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to connect to the database', error: error.message });
  }
}
