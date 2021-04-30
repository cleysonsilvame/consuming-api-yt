import Cookies from 'js-cookie';
import {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

const FacebookContext = createContext(null);

export default function FacebookProvider({ children }) {
  const [isFacebookLoggedIn, setIsFacebookLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get('facebookInfo')) {
      const facebookInfo = JSON.parse(Cookies.get('facebookInfo'));

      const dateExpires = new Date(
        1000 * facebookInfo?.data_access_expiration_time
      );

      if (dateExpires > new Date()) setIsFacebookLoggedIn(true);
    }
  }, []);

  return (
    <FacebookContext.Provider
      value={{
        isFacebookLoggedIn,
        setIsFacebookLoggedIn,
      }}
    >
      {children}
    </FacebookContext.Provider>
  );
}

export function useIsFacebookLoggedIn() {
  const context = useContext(FacebookContext);
  const {
    isFacebookLoggedIn,
    setIsFacebookLoggedIn,
  }: {
    isFacebookLoggedIn: boolean;
    setIsFacebookLoggedIn: Dispatch<SetStateAction<boolean>>;
  } = context;

  return { isFacebookLoggedIn, setIsFacebookLoggedIn };
}
