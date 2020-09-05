const express = require('express');
const router = express.Router()

const {getBroadcast,getComments} = require('../controllers/apiYouTubeController')

router.get('/', getBroadcast);
router.get('/comments/:codelive', getComments);

module.exports = router;
