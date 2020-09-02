const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/authController')


router.get('/', AuthController.setAuthTokensController)


module.exports = router