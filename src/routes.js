const express = require('express')
const routes = express.Router()

const AuthController = require('./controllers/authController')
const broadcast = require('./routes/broadcast');
const front = require('./routes/front');


routes.get('/', (req, res) => {
  res.send([{
    message: 'Welcome to the Consuming API YouTube',
    options: 
    {
      auth: 'Method GET at /auth route',
      broadcast: 'Method GET at /broadcast route',
    }
  }])
})

routes.use(`/front`,front);




routes.get('/auth', AuthController.getAuthentication)
routes.get('/oauth2callback', AuthController.setSessionAuth)

routes.use('/broadcast',broadcast);


module.exports = routes
