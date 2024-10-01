// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    currency: { type: Number, default: 0 }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
