const express = require('express')
const passport = require("passport")
const router = express.Router()

// @desc Authenticate with Google
// @route GET /auth/google
// Using GoogleStrategy to authenticate, created in config/passport.js.
router.get('/google', passport.authenticate('google', {
    // What is scope? https://developers.google.com/identity/protocols/googlescopes
    // So this is saying to use whatever scope is included in the profile.
    scope: ['profile']
}))

// @desc Google authentication callback
// @route GET /auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/dashboard')
    })

// OR:
// router.get('/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/'
//     }))

module.exports = router