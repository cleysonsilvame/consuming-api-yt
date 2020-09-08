let { google } = require('googleapis')
const youtube = google.youtube({ version: 'v3' })
const {createOAuthClient} = require('./authController');
require('dotenv').config()
const fs = require('fs');



//Le os tokens no arquivo assim nao precisa fazer o processo de login toda vez
fs.readFile('./google.tmp', 'utf8', async function(err, contents) {
  const tokens =  JSON.parse(contents) || ''
  const OAuthClient = await createOAuthClient();
  OAuthClient.setCredentials(tokens);
        google.options({
        auth: OAuthClient
      })
});


const  getBroadcast = async (req, res) => {
  return youtube.liveBroadcasts.list({
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    broadcastStatus: 'active'
  }).then((response) => {
    const jsonItems = response.data.items
    jsonItems.reverse()

    let liveChatIds = {
      message: 'Enter at the path the lives codes to access comments',
      path: 'Method GET at /json/broadcast/comments route',
      lives: {}
    }

    for (let i = 0; i < jsonItems.length; i++) {
      let date = new Date(jsonItems[i].snippet.publishedAt).toString()

      liveChatIds.lives[`Live ${i + 1}`] = {
        code: jsonItems[i].snippet.liveChatId,
        publishedAt: date,
        title: jsonItems[i].snippet.title,
      }
    }

    if(res)
      res.json(liveChatIds)
    return liveChatIds.lives;

  }).catch((err) => {

    if(res)
      res.status(err.code).send(err.errors)
    console.log(`Erro ao buscar Lives ${err.message}`);
    return {error:"ERRO: "+err.message};
  })
};

const getCommentsInternal = async(codeLive, pageToken='', comentarios_array = []) => {

  return youtube.liveChatMessages.list({
    key: process.env.YOUTUBE_TOKEN,
    liveChatId: codeLive,
    part: 'snippet, authorDetails',
    maxResults: 100,
    pageToken: pageToken
  }).then((response) => {
    const jsonItems = response.data.items

    let commentsInfo = {
      nextPageToken: response.data.nextPageToken,
      totalResults: response.data.pageInfo.totalResults,
      resultsPerPage: response.data.pageInfo.resultsPerPage,
    }
    if(commentsInfo.totalResults === 0)
      return comentarios_array;

    for(let item of jsonItems){
      let date = new Date(item.snippet.publishedAt).toString()

      let obj = {
        displayName: item.authorDetails.displayName,
        profileImageUrl: item.authorDetails.profileImageUrl,
        displayMessage: item.snippet.displayMessage,
        publishedAt: date,
      }
      comentarios_array.push(obj);
    }

    comentarios_array.reverse()

    return getCommentsInternal(codeLive,commentsInfo.nextPageToken,comentarios_array);

  }).catch((err) => {
    console.log(`Erros ao pegar mensagens ${err.message}`);
    return res.status(err.code).send(err.errors)
  })
}


const getComments = async (req, res) => {

  const codeLive = req.params.codelive

  
  return getCommentsInternal(codeLive);

}


module.exports = {
  getBroadcast,
  getComments,
}
