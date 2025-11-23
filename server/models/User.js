import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  purchasedPackages: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
