const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

// -----------------------------------------------------
// Options for the GoogleStrategy.
const googleClientOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}
const strategy = new GoogleStrategy(
    googleClientOptions,
    // The function that is called after the user authenticates.
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
    })

// -----------------------------------------------------
// "passport" parameter is passed in from require('config/passport')(passport) over in app.js.
module.exports = (passport) => {
    passport.use(strategy)
    // Determines which data of the user object should be stored in the session.
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    // Explanation here: https://stackoverflow.com/a/27637668
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}