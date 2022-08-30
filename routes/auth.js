const express = require('express')
const passport = require("passport")
const router = express.Router()

// -----------------------------------------------------
// @desc Authenticate with Google
// @route GET /auth/google
// Using GoogleStrategy to authenticate, created in config/passport.js.
// What is scope? https://developers.google.com/identity/protocols/googlescopes
// This is saying to use whatever scope is included in the profile.
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// -----------------------------------------------------
// @desc Google authentication callback
// @route GET /auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/dashboard')
    })

// -----------------------------------------------------
// @desc Logout
// @route GET /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})

module.exports = router