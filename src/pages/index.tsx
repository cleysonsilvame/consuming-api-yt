import { useEffect, useState } from 'react';

export default function Home() {
  const [videoURL, setVideoURL] = useState('');
  const [videoID, setVideoID] = useState('');
  const regex = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  );

  useEffect(() => {
    try {
      if (videoURL.match(regex)) {
        const url = new URL(videoURL);
        const searchParams = new URLSearchParams(url.search);

        const videoIDParams = searchParams.get('v');

        if (videoIDParams) {
          setVideoID(videoIDParams);
        } else setVideoID('');
      }
    } catch (error) {
      console.log(error);
    }
  }, [videoURL]);

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
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              type="text"
              className="form-control text-center"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
            />
          </div>
        </div>
        <div className="col-12">
          <a
            href={'livestream/comments?videoID=' + videoID}
            className="mt-3 btn btn-lg btn-outline-dark btn-block"
          >
            Selecionar Livestream
          </a>
        </div>
      </div>
    </div>
  );
}
