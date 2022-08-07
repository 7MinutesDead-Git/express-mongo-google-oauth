// Dealing with a database of users means we'll want a User model.
const mongoose = require('mongoose')

// Setting up the database schema for a User.
// Each field name, type, whether it's required, etc.
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Want to export this schema specifically as a mongoose model.
module.exports = mongoose.model('User', UserSchema)