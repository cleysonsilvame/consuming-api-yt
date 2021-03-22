export default function Home() {
  return (
    <div className="container py-5">
      <div className="text-center">
        <img width="250px" src="img/logo-nd.png" />
        <h1>Pegador Comentários YouTube</h1>
        <p className="lead">Conecte a conta do YouTube para começar</p>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="input-group input-group-lg">
            <span className="input-group-text" id="inputGroup-sizing-lg">
              Livestream URL
            </span>
            <input
              type="text"
              className="form-control text-center"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
            />
          </div>
        </div>
        <div className="col-12">
          <a
            href="api/livestream/qweqwe"
            className="mt-3 btn btn-lg btn-outline-dark btn-block"
          >
            Selecionar Livestream
          </a>
        </div>
      </div>
    </div>
  );
}
