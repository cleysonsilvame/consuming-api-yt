import CommentsYoutube from '../../components/CommentsYoutube';

export default function Comments() {
  return (
    <div className="container">
      <div className="py-5 text-center">
        <h1>Comentarios</h1>
        <p className="lead">
          Selecione o comentário para enviar para a Livestream
        </p>
      </div>

      <div className="row">
        <div className="col-12">
          <CommentsYoutube />
        </div>
      </div>
    </div>
  );
}
