const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // First, delete any existing admin user
    await Admin.deleteOne({ username: 'admin' });
    console.log('Cleaned up existing admin user');

    const adminData = {
      username: 'admin',
      password: 'admin', // This will be hashed automatically by the schema
      role: 'admin'
    };

    const admin = new Admin(adminData);
    await admin.save();
    
    // Verify the admin was created
    const createdAdmin = await Admin.findOne({ username: 'admin' });
    if (createdAdmin) {
      console.log('Admin user created successfully');
      console.log('Admin ID:', createdAdmin._id);
      // Test password comparison
      const isMatch = await createdAdmin.comparePassword('admin');
      console.log('Password comparison test:', isMatch ? 'PASSED' : 'FAILED');
    } else {
      console.log('Failed to create admin user');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
