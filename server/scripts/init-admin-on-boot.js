import Admin from '../models/Admin.js';

export async function initAdminOnBoot() {
  try {
    if (process.env.ADMIN_AUTO_SEED !== 'true') {
      return;
    }

    const username = process.env.ADMIN_SEED_USERNAME || 'admin';
    const password = process.env.ADMIN_SEED_PASSWORD || 'admin123';

    const exists = await Admin.findOne({ username });
    if (exists) {
      console.log(`ℹ️ Admin already exists: ${username}`);
      return;
    }

    const admin = new Admin({ username, password });
    await admin.save();
    console.log(`✅ Admin auto-seeded: ${username}`);
  } catch (err) {
    console.error('Admin auto-seed error:', err.message);
  }
}
