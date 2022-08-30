const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../middleware/auth')
const { ensureGuest } = require('../middleware/auth')

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
    res.render("login_view", {
        layout: "login_layout"
    })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    console.log(req.user)
    res.render("dashboard")
})

module.exports = router