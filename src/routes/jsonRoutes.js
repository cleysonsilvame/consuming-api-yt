const express = require('express');
const router = express.Router()

const {getBroadcast,getComments} = require('../controllers/apiYouTubeController')

router.get('/', (req, res) => {
  res.send([{
    message: 'Welcome to the Consuming API YouTube',
    options: 
    {
      auth: 'Method GET at /auth route',
      broadcast: 'Method GET at /json/broadcast route',
    }
  }])
})

router.get('/broadcast', getBroadcast)
router.get('/broadcast/comments/:codelive', getComments)

module.exports = router;