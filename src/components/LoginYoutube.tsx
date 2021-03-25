import { useState } from 'react';
import { useYoutubeLiveID } from '../context/Youtube';

export default function LoginYouTube() {
  const [videoURL, setVideoURL] = useState('');
  const { youtubeLiveID, setYoutubeLiveID } = useYoutubeLiveID();
  const URL_REGEX = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  );
  const YOUTUBE_REGEX = new RegExp(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  );

  function handleSetVideoID() {
    if (videoURL.match(URL_REGEX) && videoURL.match(YOUTUBE_REGEX)) {
      const url = new URL(videoURL);

      if (url.searchParams.get('v')) {
        setYoutubeLiveID(url.searchParams.get('v'));
      } else {
        setYoutubeLiveID(url.pathname.split('/')[1]);
      }
    }
  }

  function handleRemoveVideoURL() {
    setYoutubeLiveID('');
    setVideoURL('');
  }

  return (
    <div className="input-group input-group-lg">
      <input
        value={videoURL}
        onChange={(e) => setVideoURL(e.target.value)}
        type="text"
        className="form-control"
        id="inputGroupFile04"
        aria-describedby="inputGroupFileAddon04"
        aria-label="Upload"
      />
      {youtubeLiveID ? (
        <button
          onClick={handleRemoveVideoURL}
          className="btn btn-outline-dark mt-3"
          type="button"
          id="inputGroupFileAddon04"
        >
          Retirar Youtube ID
        </button>
      ) : (
        <button
          onClick={handleSetVideoID}
          className="btn btn-outline-dark mt-3"
          type="button"
          id="inputGroupFileAddon04"
        >
          Selecionar Livestream
        </button>
      )}
    </div>
  );
}
