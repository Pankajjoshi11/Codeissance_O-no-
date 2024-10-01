// models/Game.js
import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the User
});

export default mongoose.models.Game || mongoose.model('Game', GameSchema);
