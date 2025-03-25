const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true},
    username: { type: String, required: true },
    nickname: { type: String, required: false },
    joinedAt: { type: Date, required: true },
    linksPosted: {type: Number, required: false},
    turtles: {type: Number, required: false},
    rabbits: {type: Number, required: false}
});




// Check if models are already defined to prevent the "overwrite model" error
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;