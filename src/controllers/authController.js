const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
// require('dotenv').config()

const credentials = require('../credentials/client_secret_164362257431-2ujlfqu0fvp9m79mnbkahqd52b869u6h.apps.googleusercontent.com.json')
const OAuthClient = new OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
)

module.exports = {
  async getAuthentication(req, res){
    const consentUrl = OAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/youtube.readonly']
    })
    res.json(
    {
      message: 'Click on link to auth',
      consentUrl: consentUrl,
    })
  },

  async setSessionAuth(req, res){
    const OAuthClient = new OAuth2(
      credentials.web.client_id,
      credentials.web.client_secret,
      credentials.web.redirect_uris[0]
    )

    const authCode = req.query.code
    res.send('Authentication success. Thank you!')
    OAuthClient.setCredentials((await OAuthClient.getToken(authCode)).tokens)
  
    google.options({
      auth: OAuthClient
    })
  }
}