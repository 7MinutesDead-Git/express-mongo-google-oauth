const mongoose = require('mongoose')

async function connectDB() {
    try {
        // From Mongoose 6 docs:
        // https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
        // useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex
        // are no longer supported options. Mongoose 6 always behaves as if
        // useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and
        // useFindAndModify is false.
        // Please remove these options from your code.
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`🐡 MongoDB connected at ${connection.connection.host} 🐡`)
    } catch (err) {
        console.log('🙈🔥 Unable to connect to MongoDB 🔥🙈')
        console.error(err)
    }
}

module.exports = connectDB