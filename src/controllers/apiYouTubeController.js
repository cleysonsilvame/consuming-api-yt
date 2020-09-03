const { google } = require('googleapis')
require('dotenv').config()

module.exports = {
  async getBroadcast(req,res){
    google.youtube('v3').liveChatMessages.list({
      key: process.env.YOUTUBE_TOKEN,
      liveChatId: 'Cg0KCzJ6M3FxQTJQS3Y4KicKGFVDRGtfbWphTDdsU0NrTEFUTHRiSFg1dxILMnozcXFBMlBLdjg',
      part: 'snippet, authorDetails',
    }).then((response) => {
      
    res.json(response.data.items)
    }).catch((err) => res.json(err))
  }

}


  