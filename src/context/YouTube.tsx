import Cookies from 'js-cookie';
import {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

const YouTubeContext = createContext(null);

export default function YouTubeProvider({ children }) {
  const [youTubeLiveID, setYouTubeLiveID] = useState('');

  useEffect(() => {
    if (Cookies.get('youTubeLiveId')) {
      setYouTubeLiveID(Cookies.get('youTubeLiveId'));
    }
  }, []);

  useEffect(() => {
    Cookies.set('youTubeLiveId', youTubeLiveID);
  }, [youTubeLiveID]);

  return (
    <YouTubeContext.Provider
      value={{
        youTubeLiveID,
        setYouTubeLiveID,
      }}
    >
      {children}
    </YouTubeContext.Provider>
  );
}

export function useYouTubeLiveID() {
  const context = useContext(YouTubeContext);
  const {
    youTubeLiveID,
    setYouTubeLiveID,
  }: {
    youTubeLiveID: string;
    setYouTubeLiveID: Dispatch<SetStateAction<string>>;
  } = context;

  return { youTubeLiveID, setYouTubeLiveID };
}
