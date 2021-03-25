interface IComment {
  displayMessage: number;
  displayName: string;
  profileImageUrl: string;
  publishedAt: Date;
}

interface IComments {
  commentsInfo: {
    nextPageToken: string;
    totalResults: number;
    resultsPerPage: number;
    livestreamChannelId: string;
  };
  comments: [IComment];
}

interface ICommentsSelected {
  livestreamChannelId: string;
  comment: IComment;
}

export { IComment, IComments, ICommentsSelected };
