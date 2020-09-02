const { google } = require('googleapis')
require('dotenv').config()

module.exports = {
  async getBroadcast(req,res){
    google.youtube('v3').channels.list({
      key: process.env.YOUTUBE_TOKEN,
      forUsername: 'FlowPodcast',
      part: 'contentDetails',
    }).then((response) => {
      
    res.json(response)
    }).catch((err) => res.json(err))
  }

}


  