import { useState } from 'react';
import CommentsFacebook from '../../components/CommentsFacebook';
import CommentsYouTube from '../../components/CommentsYouTube';

export default function Comments() {
  const [isNeedRefresh, setIsNeedRefresh] = useState(false);

  return (
    <div className="container">
      <div className="pt-5 text-center">
        {isNeedRefresh && (
          <button
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
            onClick={() => {
              console.log('1');
            }}
          >
            Clique para obter novos dados!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setIsNeedRefresh(false)}
            />
          </button>
        )}
        <h1>Comentários</h1>
        <p className="lead">
          Selecione o comentário para enviar para a Livestream
        </p>
      </div>

      <div className="row pb-4">
        <div className="col-6">
          <CommentsYouTube />
        </div>
        <div className="col-6">
          <CommentsFacebook />
        </div>
      </div>
    </div>
  );
}
