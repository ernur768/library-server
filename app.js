require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express')
const router = require('./src/router')

const errorMiddleware = require('./src/middleware/error-middleware.');

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/', router)
app.use(errorMiddleware)

const run = async () => {

    const PORT = process.env.PORT || 3000
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(`Server running on port ${PORT}`)
    })
}

run()