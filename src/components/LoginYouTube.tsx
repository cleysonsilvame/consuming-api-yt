import { useEffect, useState } from 'react';
import { useYouTubeLiveID } from '../context/YouTube';

export default function LoginYouTube() {
  const [videoURL, setVideoURL] = useState('');
  const [isValidationClassName, setIsValidationClassName] = useState('');
  const { youTubeLiveID, setYouTubeLiveID } = useYouTubeLiveID();
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
        setYouTubeLiveID(url.searchParams.get('v'));
      } else {
        setYouTubeLiveID(url.pathname.split('/')[1]);
      }
    }
  }

  function handleRemoveVideoURL() {
    setYouTubeLiveID('');
    setVideoURL('');
  }

  useEffect(() => {
    if (
      videoURL !== '' &&
      !videoURL.match(URL_REGEX) &&
      !videoURL.match(YOUTUBE_REGEX)
    )
      setIsValidationClassName('is-invalid');
    else setIsValidationClassName('');
  }, [videoURL]);

  return (
    <div className="input-group input-group-lg">
      {youTubeLiveID ? (
        <button
          onClick={handleRemoveVideoURL}
          className="btn btn-outline-danger w-100"
          type="button"
        >
          Retirar YouTube ID
        </button>
      ) : (
        <>
          <button
            onClick={handleSetVideoID}
            className="btn btn-outline-dark"
            type="button"
          >
            Selecionar Livestream
          </button>
          <input
            value={videoURL}
            onChange={e => setVideoURL(e.target.value)}
            type="text"
            className={`form-control ${isValidationClassName}`}
            placeholder="YouTube Livestream URL"
            aria-label="YouTube Livestream URL"
          />
        </>
      )}
    </div>
  );
}
