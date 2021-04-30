import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../util/mongodb';

interface IComment {
  displayMessage: number;
  displayName: string;
  profileImageUrl: string;
  publishedAt: Date;
}

interface ICommentsSelectedResponse {
  livestreamChannelId: string;
  comment: IComment;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db }: { db: Db } = await connectToDatabase();
    const collection = db.collection('youtube');

    if (req.method === 'POST') {
      const commentSelected: ICommentsSelectedResponse = req.body;
      const { livestreamChannelId } = commentSelected;

      const response = await collection.findOneAndReplace(
        { livestreamChannelId },
        commentSelected
      );

      if (!response?.lastErrorObject?.updatedExisting) {
        const response = await collection.insertOne(commentSelected);
        return res.json(response.ops[0]);
      }

      return res.json(response?.value);
    }

    const livestreamChannelId = req.query?.livestreamChannelId || '';

    if (livestreamChannelId) {
      const response = await collection.findOne({ livestreamChannelId });
      return res.json(response);
    }
  } catch (error) {
    return res.json(error);
  }

  return res.json({ message: 'informe o livestreamChannelId' });
};
