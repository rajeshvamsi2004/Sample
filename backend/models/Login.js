const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    emailOrMobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true 
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true 
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('auths', userSchema);

module.exports = User;