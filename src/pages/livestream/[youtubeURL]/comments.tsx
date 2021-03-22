export default function Comments() {
  return (
    <div className="container">
      <div className="py-5 text-center">
        {/* {{!-- <img src="logo-nd.png"> --}} */}
        <h1>Comentarios</h1>
        <p className="lead">Clique para enviar o comentario para live</p>
        <a
          href="/broadcast/comment"
          className="mt-3 btn btn-outline-dark btn-block"
        >
          Ver comentário selecionado
        </a>
        <p className="lead">comentarios.error</p>
      </div>

      <div className="row">
        <div className="col-12">
          {/* {{#each comentarios}} */}
          <div className="card p-2 my-2">
            <form action="/broadcast/comment" method="post">
              <input
                type="text"
                name="displayName"
                value="{{displayName}}"
                hidden
              />
              <input
                type="text"
                name="profileImageUrl"
                value="{{profileImageUrl}}"
                hidden
              />
              <input
                type="text"
                name="displayMessage"
                value="{{displayMessage}}"
                hidden
              />
              <input
                type="text"
                name="publishedAt"
                value="{{publishedAt}}"
                hidden
              />
              <div className="media d-flex align-items-center">
                <img
                  src="{{this.profileImageUrl}}"
                  className="mr-3 rounded-circle"
                  alt="..."
                  width="60rem"
                />
                <div className="media-body">
                  <h5 className="mt-0">this.displayName</h5>
                  <span className="font-italic">this.displayMessage</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <button type="submit" className="btn btn-outline-dark my-2">
                    Enviar comentário{' '}
                  </button>
                  <span className="badge badge-secondary">
                    this.publishedAt
                  </span>
                </div>
              </div>
            </form>
          </div>
          {/* {{/each}} */}
        </div>
      </div>
    </div>
  );
}
