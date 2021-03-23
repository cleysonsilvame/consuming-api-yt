import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
const youtube = google.youtube({ version: 'v3' });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id) return res.json({ message: 'Informe o ID da livestream' });
  const pageToken = req.query?.pageToken;

  const youtubeURL = req.query.id.toString();
  const youtubeToken = process.env.YOUTUBE_TOKEN;

  const auth = google.auth.fromAPIKey(youtubeToken);
  google.options({ auth });

  const liveStreamResponse = await youtube.videos.list({
    id: [youtubeURL],
    part: ['liveStreamingDetails'],
  });

  const liveChatId =
    liveStreamResponse.data.items[0]?.liveStreamingDetails.activeLiveChatId;

  try {
    const commentsResponse = await youtube.liveChatMessages.list({
      liveChatId,
      part: ['snippet, authorDetails'],
      maxResults: 100,
      pageToken: pageToken ? pageToken.toString() : '',
    });

    const commentsData = commentsResponse.data.items;

    const comments = [];

    const commentsInfo = {
      nextPageToken: commentsResponse.data.nextPageToken,
      totalResults: commentsResponse.data.pageInfo.totalResults,
      resultsPerPage: commentsResponse.data.pageInfo.resultsPerPage,
    };
    if (commentsInfo.totalResults === 0) return comments;

    for (let item of commentsData) {
      let date = new Date(item.snippet.publishedAt).toString();

      let obj = {
        displayName: item.authorDetails.displayName,
        profileImageUrl: item.authorDetails.profileImageUrl,
        displayMessage: item.snippet.displayMessage,
        publishedAt: date,
      };
      comments.push(obj);
    }

    comments.reverse();

    res.json({
      commentsInfo,
      comments,
    });
  } catch (error) {
    res.json(error?.response?.data?.error);
  }
}
