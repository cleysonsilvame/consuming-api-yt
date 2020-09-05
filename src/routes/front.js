const express = require('express');
const router = express.Router()
const AuthController = require('../controllers/authController')
const {getBroadcast,getComments} = require('../controllers/apiYouTubeController')



router.get('/',async (req,res)=>{
    let saida = {url: await AuthController.getAuthentication(req)};
    res.render('index',saida);
});

router.get('/broadcast',async (req,res)=>{
    let saida = {lives: await getBroadcast(req)};
    console.log(saida);
    res.render('broadcast',saida);
});

router.get('/broadcast/comments/:codelive',async (req,res)=>{
    let saida = {comentarios: await getComments(req)};
    console.log(saida);

    res.render('comentarios',saida);
});
module.exports = router;
