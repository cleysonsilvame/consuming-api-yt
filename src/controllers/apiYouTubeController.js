const { google } = require('googleapis')
const youtube = google.youtube({ version: 'v3' })
require('dotenv').config()

module.exports = {
  async getBroadcast(req, res) {
    youtube.liveBroadcasts.list({
      key: process.env.YOUTUBE_TOKEN,
      part: 'snippet',
      broadcastStatus: 'active'
    }).then((response) => {
      const jsonItems = response.data.items
      jsonItems.reverse()

      var liveChatIds = {
        message: 'Enter at the path the lives codes to access comments',
        path: 'Method GET at /comments route',
        lives: {}
      }

      for (let i = 0; i < jsonItems.length; i++) {
        let date = new Date(jsonItems[i].snippet.publishedAt).toString()

        liveChatIds.lives[`live ${i + 1}`] = {

          code: jsonItems[i].snippet.liveChatId,
          publishedAt: date,
          title: jsonItems[i].snippet.title

        }
      }

      res.json(liveChatIds)

    }).catch((err) => {
      res.status(err.code).send(err.errors)
    })
  },

  async getComments(req, res) {
    const codeLive = req.query.codelive
    const pageToken = req.query.pagetoken
    
    
    youtube.liveChatMessages.list({
      key: process.env.YOUTUBE_TOKEN,
      liveChatId: codeLive,
      part: 'snippet, authorDetails',
      maxResults: 10,
      pageToken: pageToken
    }).then((response) => {
      const jsonItems = response.data.items
      console.log(response.data.pageInfo.totalResults == response.data.pageInfo.resultsPerPage)

      if(response.data.pageInfo.totalResults != response.data.pageInfo.resultsPerPage){
        res.redirect(`/comments?codelive=${codeLive}&pagetoken=${response.data.nextPageToken}`)
        // res.redirect('/')
        console.log(response.data.nextPageToken)
      }

      var commentsInfo = {
        nextPageToken: response.data.nextPageToken,
        totalResults: response.data.pageInfo.totalResults,
        resultsPerPage: response.data.pageInfo.resultsPerPage,
      }


      for (let i = 0; i < jsonItems.length; i++) {
        let date = new Date(jsonItems[i].snippet.publishedAt).toString()

        commentsInfo[`comment ${i + 1}`] = {
          displayName: jsonItems[i].authorDetails.displayName,
          profileImageUrl: jsonItems[i].authorDetails.profileImageUrl,
          displayMessage: jsonItems[i].snippet.displayMessage,
          publishedAt: date,
        }
      }

      res.json(commentsInfo)


    }).catch((err) => {
      res.status(err.code).send(err.errors)
    })


  }
}