import mongoose from 'mongoose';

const UserActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  action: { type: String, required: true },
  details: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: false });

export default mongoose.model('UserActivity', UserActivitySchema);
