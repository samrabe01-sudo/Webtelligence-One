import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webtelligence';

async function run(){
  await connectDB(MONGODB_URI);
  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';
  const existing = await Admin.findOne({ username });
  if(existing){
    console.log('Admin already exists:', username);
    process.exit(0);
  }
  const admin = new Admin({ username, password });
  await admin.save();
  console.log('✅ Admin user created:', username);
  process.exit(0);
}

run().catch(err=>{ console.error(err); process.exit(1); });
