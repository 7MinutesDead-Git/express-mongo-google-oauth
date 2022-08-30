const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const PORT = process.env.PORT || 6900

// -----------------------------------------------------
// Options for the GoogleStrategy.
const googleClientOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/auth/google/callback`
}
// This is called after the user authenticates with Google.
async function verify(accessToken, refreshToken, profile, callback) {
    // To check the structure of the profile object coming from Google, try console logging it.
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        image: profile.photos[0].value
    }
    // Upsert if user doesn't exist.
    const user = await User.findOneAndUpdate({googleId: profile.id}, newUser, {upsert: true, new: true})
    callback(null, user)
}

const strategy = new GoogleStrategy(googleClientOptions, verify)

// -----------------------------------------------------
// "passport" parameter is passed in from require('config/passport')(passport) over in app.js.
module.exports = (passport) => {
    passport.use(strategy)
    // Determines which data of the user object should be stored in the session.
    // In this case, it's the user's id.
    passport.serializeUser((user, callback) => {
        callback(null, user.id)
    })
    // Explanation here: https://stackoverflow.com/a/27637668
    passport.deserializeUser((id, callback) => {
        User.findById(id, (err, user) => callback(err, user))
    })
}