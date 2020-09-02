const express = require('express')
const router = express.Router()

const TestingController = require('../controllers/authController')

router.get('/', TestingController.getTesting)

module.exports = router