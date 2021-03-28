import CommentsFacebook from '../../components/CommentsFacebook';
import CommentsYoutube from '../../components/CommentsYoutube';

export default function Comments() {
  return (
    <div className="container">
      <div className="pt-5 text-center">
        <h1>Comentarios</h1>
        <p className="lead">
          Selecione o comentário para enviar para a Livestream
        </p>
      </div>

      <div className="row pb-4">
        <div className="col-6">
          <CommentsYoutube />
        </div>
        <div className="col-6">
          <CommentsFacebook />
        </div>
      </div>
    </div>
  );
}
