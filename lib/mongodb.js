import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Already connected
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectMongo;
