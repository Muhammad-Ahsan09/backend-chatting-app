const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },

    profilePic: {
        type: String,
        default: ''
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);

module.exports = {userModel};