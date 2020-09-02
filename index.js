const express = require('express')

const app = express()

const authRoute = require('./src/routes/authRoute')


app.use('/getTesting', authRoute)

app.listen(3000)