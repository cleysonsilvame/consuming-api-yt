const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
// require('dotenv').config()


module.exports = {
  async getAuthentication(req, res) {
    async createOAuthClient(){
      const credentials = require('../credentials/client_secret_164362257431-2ujlfqu0fvp9m79mnbkahqd52b869u6h.apps.googleusercontent.com.json')

      
      const OAuthClient = new OAuth2(
        credentials.web.client_id,
        credentials.web.client_secret,
        credentials.web.redirect_uris[0]
        )
      }
      
      
      const consentUrl = OAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtube.force-ssl']
      })
    
    const authCode = req.query.code
    res.send('Authentication success. Thank you!')
    OAuthClient.setCredentials((await OAuthClient.getToken(authCode)).tokens)

    google.options({
      auth: OAuthClient
    })
  }
}