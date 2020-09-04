const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
require('dotenv').config()


async function createOAuthClient() {
  const credentials = require('../credentials/client_secret_164362257431-2ujlfqu0fvp9m79mnbkahqd52b869u6h.apps.googleusercontent.com.json')

  const OAuthClient = new OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  )

  return OAuthClient
}

module.exports = {
  async getAuthentication(req, res) {
    const OAuthClient = await createOAuthClient()
    requestUserConset(OAuthClient)

    async function requestUserConset(OAuthClient) {
      const consentUrl = OAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube.readonly']
      })
      res.redirect(consentUrl)
    }

  },

  async setSessionAuth(req, res) {
    const authCode = req.query.code
    const OAuthClient = await createOAuthClient()
    await requestGoogleForAcessTokens(OAuthClient, authCode)
    await setGlobalGoogleAuth(OAuthClient)

    async function requestGoogleForAcessTokens(OAuthClient, authCode) {

      await OAuthClient.getToken(authCode, (error, tokens) => {
        if (error) {
          console.log(error)
          return error
        }

        OAuthClient.setCredentials(tokens)
      })

    }

    async function setGlobalGoogleAuth(OAuthClient) {
      google.options({
        auth: OAuthClient
      })
      res.redirect('/authenticated')
      console.log('Authentication success. Thank you!')
    }
  }
}