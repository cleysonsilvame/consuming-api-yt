const express = require('express')
const routes = express.Router()

const AuthController = require('./controllers/authController')
const ApiYouTubeController = require('./controllers/apiYouTubeController')

routes.get('/', (req, res) => {
  return res.json(
    {
      message: 'For more information access the documentation!',
      link: 'https://github.com/cleysonsilvame/consuming-api-yt'
    })
})

routes.get('/auth', AuthController.getAuthentication)
routes.get('/oauth2callback', AuthController.setSessionAuth)
routes.get('/broadcast', ApiYouTubeController.getBroadcast)

module.exports = routes