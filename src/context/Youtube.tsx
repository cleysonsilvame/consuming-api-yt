import Cookies from 'js-cookie';
import {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

const YoutubeContext = createContext(null);

export default function YoutubeProvider({ children }) {
  const [youtubeLiveID, setYoutubeLiveID] = useState('');

  useEffect(() => {
    if (Cookies.get('youtubeLiveId')) {
      setYoutubeLiveID(Cookies.get('youtubeLiveId'));
    }
  }, []);

  useEffect(() => {
    Cookies.set('youtubeLiveId', youtubeLiveID);
  }, [youtubeLiveID]);

  return (
    <YoutubeContext.Provider
      value={{
        youtubeLiveID,
        setYoutubeLiveID,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
}

export function useYoutubeLiveID() {
  const context = useContext(YoutubeContext);
  const {
    youtubeLiveID,
    setYoutubeLiveID,
  }: {
    youtubeLiveID: string;
    setYoutubeLiveID: Dispatch<SetStateAction<string>>;
  } = context;

  return { youtubeLiveID, setYoutubeLiveID };
}
