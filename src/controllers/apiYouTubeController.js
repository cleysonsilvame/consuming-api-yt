const { google } = require('googleapis')
const youtube = google.youtube({ version: 'v3'})
require('dotenv').config()

module.exports = {
  async getBroadcast(req,res){
    youtube.liveBroadcasts.list({
      key: process.env.YOUTUBE_TOKEN,
      part: 'snippet',
      broadcastStatus: 'active'
    }).then((response) => {
      const jsonItems = response.data.items
      var liveChatIds = []

      for (let i = 0; i < jsonItems.length; i++){
        liveChatIds.push(jsonItems[i].snippet.liveChatId)
      }
      
      res.send(liveChatIds)
    
    }).catch((err) => res.json(err))
  },
  
  // async getLiveChat(req,res){
  //   youtube_v3.liveChatMessages.list({
  //     key: process.env.YOUTUBE_TOKEN,
  //     liveChatId: 'Cg0KCzJ6M3FxQTJQS3Y4KicKGFVDRGtfbWphTDdsU0NrTEFUTHRiSFg1dxILMnozcXFBMlBLdjg',
  //     part: 'snippet, authorDetails',
  //   }).then((response) => {
      
  //   res.json(response.data.items)
  //   }).catch((err) => res.json(err))
  // }
}


  