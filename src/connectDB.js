const { mongoDB } = require('../config/config.json');

const connectDB = async () => {
    try {
        const mongoose = await import('mongoose');
        const conn = await mongoose.connect(mongoDB);
        console.log('MongoDB connected successfully');
        return conn;
    } catch (err) {
        console.log('DB connection error: ', err);
        process.exit(1);
    }
};

module.exports = { connectDB };