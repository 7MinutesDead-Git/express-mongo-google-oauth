// -----------------------------------------------------
// Package imports
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const hb = require('express-handlebars')
// Needed to be able to use passport sessions.
const session = require('express-session')
// https://www.passportjs.org/packages/passport-google-oauth20/
const passport = require('passport')

// -----------------------------------------------------
// Set our environment variables based on the config files we created.
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 6900

// -----------------------------------------------------
// Configs
const connectDB = require('./config/db')
// Passing in passport into the config file as a parameter (Check out config/passport.js).
require('./config/passport')(passport)


// -----------------------------------------------------
const app = express()

function setupMiddleware() {
    // Middleware setup if we are running in development, ie "npm run dev".
    // Check package.json for the full command as it does set the environment variable too,
    // using cross-env package.
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
    }
    // Static folder for serving static files.
    app.use(express.static('public'))
}

function setupEngine() {
    // Setting the view engine to handlebars, and changing the extension name to .hbs
    // because .handlebars is a mouthful of a file name.
    app.engine('.hbs', hb.engine({
        extname: '.hbs',
        defaultLayout: 'main'
    }))
    app.set('view engine', '.hbs')
    app.set('views', './views')
}

function setupSession() {
    // Session middleware (needs to be loaded before Passport)
    // resave: false => Don't save a session if nothing is modified.
    // saveUninitialized: false => Don't create a session until something is stored.
    app.use(session({
        secret: process.env.KEYBOARD_CAT_SESSION,
        resave: false,
        saveUninitialized: false
    }))
    // Passport middleware
    app.use(passport.initialize(undefined))
    app.use(passport.session(undefined))
}

function setupRoutes() {
    // NOTE: Remember to export the router from the routes/index.js file, since we're
    // requiring it here.
    app.use('/', require('./routes/index'))
    app.use('/auth', require('./routes/auth'))
}

// -----------------------------------------------------
// Start here
setupMiddleware()
setupEngine()
setupSession()
setupRoutes()
app.listen(PORT, async () => {
    await connectDB()
    console.log(`🐡 Node up as ${process.env.NODE_ENV} on port ${PORT} 🐡`)
})