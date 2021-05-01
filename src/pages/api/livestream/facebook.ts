import { NextApiRequest, NextApiResponse } from 'next';
import Event from 'eventsource';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userToken = req.query?.access_token;

  if (userToken) {
    const response = await fetch(
      `https://graph.facebook.com/me/accounts?access_token=${userToken}`
    );

    const resp = await response.json();
    const { access_token, id } = resp?.data[0];

    var source = new Event(
      `https://streaming-graph.facebook.com/${id}/live_comments?access_token=${access_token}&comment_rate=one_per_two_seconds&fields=from{name,id},message`
    );
    source.onmessage = function (event) {
      console.log(event);
    };

    console.log();

    return res.json({ access_token, id });
  }

  res.json({ message: 'required user access token' });
}
