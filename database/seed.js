const mongoose = require('mongoose');
const User = require('../backend/models/User');
const connectDB = require('../backend/config/db');

const seedData = async () => {
    await connectDB();

    await User.deleteMany();

    const users = [
        { fullName: 'Admin User', email: 'admin@konjyosomtech.com', phone: '9865057546', password: 'admin123', role: 'admin' },
        { fullName: 'Test Technician', email: 'tech@konjyosomtech.com', phone: '9865057547', password: 'tech123', role: 'technician' },
        { fullName: 'Test Client', email: 'client@konjyosomtech.com', phone: '9865057548', password: 'client123', role: 'client' }
    ];

    await User.insertMany(users);
    console.log('Seed data inserted successfully');
    process.exit();
};

seedData();
