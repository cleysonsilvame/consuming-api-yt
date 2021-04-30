import { useEffect, useState } from 'react';
import { useYouTubeLiveID } from '../context/YouTube';
import { IComment, IComments, ICommentSelected } from '../types/commentsTypes';
import CommentsOverlay from './CommentsOverlay';

export default function CommentsYouTube() {
  const { youTubeLiveID } = useYouTubeLiveID();
  const [commentSelected, setCommentSelected] = useState<ICommentSelected>();
  const [commentsResponse, setCommentsResponse] = useState<IComments>();

  async function submitSelectedComment(
    comment: IComment,
    livestreamChannelId: string
  ) {
    setCommentSelected({
      livestreamChannelId,
      comment,
    });

    await fetch('/api/selectedComments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentSelected),
    });
  }

  async function getComments(videoID: string) {
    const response = await fetch('/api/livestream/youtube?id=' + videoID);
    if (response.status === 200) {
      setCommentsResponse(await response.json());
    }
    // setCommentsResponse({
    //   commentsInfo: {
    //     nextPageToken: 'string;',
    //     totalResults: 99,
    //     resultsPerPage: 211,
    //     livestreamChannelId: 'string;',
    //   },
    //   comments: [
    //     {
    //       displayMessage: 'string;',
    //       displayName: 'string;',
    //       profileImageUrl: 'string;',
    //       publishedAt: new Date(),
    //     },
    //     {
    //       displayMessage: 'string;',
    //       displayName: 'string;',
    //       profileImageUrl: 'string;',
    //       publishedAt: new Date(),
    //     },
    //     {
    //       displayMessage: 'string;',
    //       displayName: 'string;',
    //       profileImageUrl: 'string;',
    //       publishedAt: new Date(),
    //     },
    //     {
    //       displayMessage: 'string;',
    //       displayName: 'string;',
    //       profileImageUrl: 'string;',
    //       publishedAt: new Date(),
    //     },
    //   ],
    // });
  }

  useEffect(() => {
    if (youTubeLiveID) {
      getComments(youTubeLiveID);
    }
  }, [youTubeLiveID]);
  return (
    <>
      <div className="text-center">
        <CommentsOverlay
          commentSelected={commentSelected}
          button={{
            name: 'Ver comentário selecionado do YouTube',
            style: 'btn btn-danger btn-block',
          }}
        />
      </div>
      <div>
        {commentsResponse &&
          commentsResponse.comments.map((comment, index) => {
            return (
              <div key={index} className="card my-2 border-danger">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-2">
                      <img
                        src={comment.profileImageUrl}
                        className="me-4 rounded-circle"
                        alt="..."
                        width="60rem"
                      />
                    </div>
                    <div className="col-lg-6">
                      <h5 className="mt-0 card-title">{comment.displayName}</h5>
                      <span className="">{comment.displayMessage}</span>
                    </div>
                    <div className="col-lg-4 d-flex flex-column justify-content-center">
                      <button
                        onClick={() => {
                          submitSelectedComment(
                            commentsResponse.comments[index],
                            commentsResponse.commentsInfo.livestreamChannelId
                          );
                        }}
                        className="btn btn-dark my-2"
                      >
                        Enviar comentário
                      </button>
                      <span className="badge bg-secondary">
                        {String(
                          new Date(comment.publishedAt).getHours()
                        ).padStart(2, '0')}
                        :
                        {String(
                          new Date(comment.publishedAt).getMinutes()
                        ).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
