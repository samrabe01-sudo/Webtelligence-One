import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

(async function main(){
  try{
    dotenv.config();
    const [,, usernameArg, newPasswordArg] = process.argv;
    if(!usernameArg || !newPasswordArg){
      console.error('Kullanım: node scripts/reset-admin-password.js <username> <newPassword>');
      process.exit(1);
    }

    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webtelligence';
    await connectDB(MONGODB_URI);

    const admin = await Admin.findOne({ username: usernameArg });
    if(!admin){
      console.error(`Admin bulunamadı: ${usernameArg}`);
      process.exit(2);
    }

    admin.password = newPasswordArg; // pre-save hook bcrypt ile hashler
    await admin.save();

    console.log(`✅ Admin şifresi güncellendi: ${usernameArg}`);
    process.exit(0);
  }catch(err){
    console.error('Hata:', err);
    process.exit(3);
  }
})();
