import mongoose from 'mongoose';

// Applicant schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: false
    }

});


// Check if models are already defined to prevent the "overwrite model" error
const User = mongoose.models.Applicant || mongoose.model('User', userSchema);

export { User };