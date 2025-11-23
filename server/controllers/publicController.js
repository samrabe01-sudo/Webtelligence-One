import bcrypt from 'bcryptjs';
import { issueUserToken } from '../utils/token.js';
import User from '../models/User.js';
import UserActivity from '../models/UserActivity.js';

// Token üretimi merkezi helper ile yapılır (issueUserToken)

export async function register(req, res){
  try{
    const { email, password } = req.body || {};
    const name = (req.body && (req.body.name || req.body.username)) || undefined;
    if(!email || !password || !name){
      return res.status(400).json({ message: 'email, password ve name zorunludur' });
    }
    const exists = await User.findOne({ email });
    if(exists){
      // Enumeration risk: spesifik mesaj yerine genel kayıt hatası tercih edilebilir.
      return res.status(409).json({ message: 'Kayıt gerçekleştirilemedi' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hash, name, purchasedPackages: [] });
    const token = issueUserToken(user);
    return res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name, purchasedPackages: [] } });
  }catch(err){
    console.error('❌ Register error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}

export async function login(req, res){
  try{
    const { email, password } = req.body || {};
    if(!email || !password){
      return res.status(400).json({ message: 'email ve password zorunludur' });
    }
    const user = await User.findOne({ email });
    if(!user){
      console.log(`⚠️  Failed login - invalid credentials: ${email}`);
      return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      console.log(`⚠️  Failed login - invalid credentials: ${email}`);
      return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
    }
    const token = issueUserToken(user);
    console.log(`✅ User login success: ${email}`);
    return res.json({ token, user: { id: user._id, email: user.email, name: user.name, purchasedPackages: user.purchasedPackages||[] } });
  }catch(err){
    console.error('❌ Login error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}

export async function logActivity(req, res){
  try{
    const { action, details } = req.body || {};
    if(!action){ return res.status(400).json({ message: 'action zorunludur' }); }
    const row = await UserActivity.create({ userId: req.user.id, action, details: details || '', timestamp: new Date() });
    console.log(`📝 User activity logged: ${req.user.id} - ${action}`);
    return res.status(201).json({ ok: true, id: row._id });
  }catch(err){
    console.error('❌ Log activity error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}

export async function purchasePackage(req, res){
  try{
    const { packageName } = req.body || {};
    if(!packageName){ return res.status(400).json({ message: 'packageName zorunludur' }); }
    const user = await User.findById(req.user.id).select('-password');
    if(!user){ return res.status(404).json({ message: 'Kullanıcı bulunamadı' }); }

    const alreadyOwned = Array.isArray(user.purchasedPackages) && user.purchasedPackages.includes(packageName);
    if(alreadyOwned){
      console.log(`ℹ️  Package already owned: ${req.user.id} - ${packageName}`);
      await UserActivity.create({
        userId: req.user.id,
        action: 'purchase',
        details: JSON.stringify({ packageName, newPurchase: false }),
        timestamp: new Date()
      });
      return res.status(200).json({ purchasedPackages: user.purchasedPackages, alreadyOwned: true });
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { purchasedPackages: packageName } },
      { new: true }
    ).select('-password');

    await UserActivity.create({
      userId: req.user.id,
      action: 'purchase',
      details: JSON.stringify({ packageName, newPurchase: true }),
      timestamp: new Date()
    });

    console.log(`✅ Package purchased: ${req.user.id} - ${packageName}`);
    return res.json({ purchasedPackages: updated.purchasedPackages, alreadyOwned: false });
  }catch(err){
    console.error('❌ Purchase package error:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
}
