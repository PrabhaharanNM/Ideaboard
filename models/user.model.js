
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isGuard: {
        type: Boolean,
        default: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    lastSubmitted: {
        type: Date,
        default: null
    },
})

export const User = mongoose.model('User', userSchema);
