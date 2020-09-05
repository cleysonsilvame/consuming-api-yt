const express = require('express')
const routes = express.Router()

const AuthController = require('./controllers/authController')
const ApiYouTubeController = require('./controllers/apiYouTubeController')

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

// let comentario = {};
// routes.post('/comentario',(req,res)=>{
//    comentario = req.body.comentario;
//   res.json(comentario);
// })

// routes.get('/comentario',(req,res)=>{
//   res.json(comentario);
// })

routes.get('/auth', AuthController.getAuthentication)
routes.get('/oauth2callback', AuthController.setSessionAuth)

routes.get('/broadcast', ApiYouTubeController.getBroadcast)
routes.get('/comments', ApiYouTubeController.getComments)

module.exports = routes