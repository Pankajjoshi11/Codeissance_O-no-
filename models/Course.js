// models/Course.js
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    progress: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the User
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
