const express = require('express')
const app = express()

const authRoute = require('./routes/authRoute')
const authRouteCB = require('./routes/authRouteCB')


app.use('/', authRoute)
app.use('/oauth2callback', authRouteCB)




app.listen(3000)