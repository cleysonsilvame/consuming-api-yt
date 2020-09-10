const express = require('express');
const router = express.Router();

const { getAuthentication } = require('../controllers/authController');
const {
  getBroadcast,
  getComments,
} = require('../controllers/apiYouTubeController');
const {
  getSelectedComments,
  postSelectedComments,
} = require('../controllers/selectedsCommentsController');

let codeLive = '';

router.get('/', async (req, res) => {
  let saida = { url: await getAuthentication(req) };

  res.render('index', saida);
});

router.get('/broadcast', async (req, res) => {
  let saida = { lives: await getBroadcast(req) };
  res.render('broadcast', saida);
});

router.get('/broadcast/comments/:codelive', async (req, res) => {
  let saida = { comentarios: await getComments(req) };
  codeLive = req.params.codelive;

  saida.comentarios.forEach((item) => {
    let newDate = new Date(item.publishedAt);
    item.publishedAt = newDate.toLocaleString();
  });

  res.render('comentarios', saida);
});

router.get('/broadcast/comment', async (req, res) => {
  let saida = { codeLive, comentario: await getSelectedComments() };

  res.render('selectedsComments', saida);
});

router.post('/broadcast/comment', postSelectedComments);

module.exports = router;
