// -----------------------------------------------------
// Package imports
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const hb = require('express-handlebars')
// -----------------------------------------------------
// Our own exports
const connectDB = require('./config/db')

// -----------------------------------------------------
// Set our environment variables based on the config files we created.
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 6900
const app = express()

// -----------------------------------------------------
// Middleware setup if we are running in development, ie "npm run dev".
// Check package.json for the full command as it does set the environment variable too,
// using cross-env package.
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// Static folder for serving static files.
app.use(express.static('public'))

// -----------------------------------------------------
// Setting the view engine to handlebars, and changing the extension name to .hbs
// because .handlebars is a mouthful of a file name.
app.engine('.hbs', hb.engine({
    extname: '.hbs',
    defaultLayout: 'main'
}))
app.set('view engine', '.hbs')
app.set('views', './views')

// -----------------------------------------------------
// Routes
// NOTE: Remember to export the router from the routes/index.js file, since we're
// requiring it here.
app.use('/', require('./routes/index'))

// -----------------------------------------------------
app.listen(PORT, async () => {
    console.log(`🐡 Node up as ${process.env.NODE_ENV} on port ${PORT} 🐡`)
    await connectDB()
})