const express = require('express');
const router = express.Router()

const { getBroadcast, getComments } = require('../controllers/apiYouTubeController')
const { getSelectedComments, postSelectedComments } = require('../controllers/selectedsCommentsController')

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
router.get('/broadcast/comments/:codelive', async (req, res) => {
  let saida = { comentarios: await getComments(req) }
  res.json(saida)
})

router.get('/broadcast/comment', async (req, res) => {
  let saida = await getSelectedComments()

  console.log(saida)


  res.json(saida)
})

router.post('/broadcast/comment', async (req, res) => {

  let saida = {
    message: 'Comentário adicionado com sucesso',
    comentario: await postSelectedComments(req)
  }
  console.log(saida)
  res.json(saida)
})


module.exports = router;