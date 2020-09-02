const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
require('dotenv').config()


exports.getAuthController = async (req, res) => {
  const credentials = require('../credentials/client_secret_164362257431-2ujlfqu0fvp9m79mnbkahqd52b869u6h.apps.googleusercontent.com.json')
  
  const OAuthClient = new OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  )

  const consentUrl = OAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube']
  })
  console.log(consentUrl)
  res.send(OAuthClient)
}

exports.setAuthTokensController = async (req, res) => {
    const authCode = req.query.code
  
    
    OAuthClient.setCredentials((await OAuthClient.getToken(authCode)).tokens)
  
    google.options({
      auth: OAuthClient
    })
  
    google.client.youtube('v3').liveBroadcasts.list({
      key: process.env.YOUTUBE_TOKEN,
      id: 'NMre6IAAAiU',
      part: 'snippet',
    }).then((response) => {
    console.log(response)
    // data.items.forEach(key => {
    //   console.log(key, item)
    // })
    }).catch((err) => console.log(err))
    
    res.send('Obrigado')  
}