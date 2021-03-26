interface IComment {
  displayMessage: string;
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

interface ICommentSelected {
  livestreamChannelId: string;
  comment: IComment;
}

export { IComment, IComments, ICommentSelected };
