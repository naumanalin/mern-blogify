const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FullName: {
        type: String
    },
    email: {
        type: String
    },
    profile: {
        type: String
    },
    password: {
        type: String
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, )

module.exports = mongoose.model('user', userSchema)