const express = require('express')
const router = express.Router()

const {getAuthentication, setSessionAuth} = require('./controllers/authController')
const frontRoutes = require('./routes/frontRoutes')
const jsonRoutes = require('./routes/jsonRoutes')


router.get('/auth', getAuthentication)
router.get('/oauth2callback', setSessionAuth)


router.use('/', frontRoutes)
router.use('/json', jsonRoutes)


module.exports = router
