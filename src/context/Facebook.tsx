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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get('facebookInfo')) {
      const facebookInfo = JSON.parse(Cookies.get('facebookInfo'));

      const dateExpires = new Date(
        1000 * facebookInfo?.data_access_expiration_time
      );

      if (dateExpires > new Date()) setIsLoggedIn(true);
    }
  }, []);

  return (
    <FacebookContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </FacebookContext.Provider>
  );
}

export function useIsLoggedIn() {
  const context = useContext(FacebookContext);
  const {
    isLoggedIn,
    setIsLoggedIn,
  }: {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  } = context;

  return { isLoggedIn, setIsLoggedIn };
}
