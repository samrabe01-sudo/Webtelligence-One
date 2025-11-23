import { issueAdminToken } from '../utils/token.js';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import UserActivity from '../models/UserActivity.js';

export async function adminLogin(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Kullanıcı adı ve şifre gereklidir' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin){
      console.log(`⚠️  Admin failed login - invalid credentials: ${username}`);
      return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
    }

    const match = await admin.comparePassword(password);
    if (!match){
      console.log(`⚠️  Admin failed login - invalid credentials: ${username}`);
      return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
    }

    const token = issueAdminToken(admin);
    console.log(`✅ Admin login success: ${username}`);
    return res.json({ token });
  } catch (err) {
    console.error('❌ Admin login error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}

export async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body || {};
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'oldPassword ve newPassword zorunludur' });
    }

    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Admin bulunamadı' });

    const match = await admin.comparePassword(oldPassword);
    if (!match){
      console.log(`⚠️  Admin change password failed - invalid credentials: ${admin._id}`);
      return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
    }

    admin.password = newPassword; // pre-save hook hashler
    await admin.save();

    return res.json({ ok: true });
  } catch (err) {
    console.error('❌ Admin change password error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await User.find({}).select('-password').lean();
    return res.json(users);
  } catch (err) {
    console.error('❌ List users error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    return res.json(user);
  } catch (err) {
    console.error('❌ Get user error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}

export async function getUserActivity(req, res) {
  try {
    const { userId } = req.params;
    const activity = await UserActivity.find({ userId }).sort({ timestamp: -1 }).lean();
    return res.json(activity);
  } catch (err) {
    console.error('❌ Get activity error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}
