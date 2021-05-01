import { useEffect, useState } from 'react';
import { useFacebookInfo } from '../context/Facebook';
import { IComment, IComments, ICommentSelected } from '../types/commentsTypes';
import CommentsOverlay from './CommentsOverlay';

export default function CommentsFacebook() {
  const [commentSelected, setCommentSelected] = useState<ICommentSelected>();
  const [commentsResponse, setCommentsResponse] = useState<IComments>();
  const { facebookInfo } = useFacebookInfo();

  async function submitSelectedComment(
    comment: IComment,
    livestreamChannelId: string
  ) {
    setCommentSelected({
      livestreamChannelId,
      comment,
    });

    // await fetch('/api/selectedComments', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(commentSelected),
    // });
  }

  async function getComments(access_token) {
    const response = await fetch(
      `/api/livestream/facebook?access_token=${access_token}`
    );
    if (response.status === 200) {
      const comments = await response.json();
      console.log(comments)
      // setCommentsResponse();
    }
  }

  useEffect(() => {
    if (facebookInfo?.accessToken) {
      getComments(facebookInfo?.accessToken);
    }
  }, []);

  return (
    <>
      <div className="text-center">
        <CommentsOverlay
          commentSelected={commentSelected}
          button={{
            name: 'Ver comentário selecionado do Facebook',
            style: 'btn btn-primary btn-block',
          }}
        />
      </div>
      <div>
        {commentsResponse &&
          commentsResponse.comments.map((comment, index) => {
            return (
              <div key={index} className="card my-2 border-primary">
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
