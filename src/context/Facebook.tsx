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

interface IFacebookInfo {
  accessToken?: string;
  data_access_expiration_time?: number;
  expiresIn?: number;
  graphDomain?: string;
  id?: string;
  name?: string;
  signedRequest?: string;
  userID?: string;
}

export default function FacebookProvider({ children }) {
  const [facebookInfo, setFacebookInfo] = useState<IFacebookInfo>();

  useEffect(() => {
    if (Cookies.get('facebookInfo')) {
      const facebookInfoTemp = JSON.parse(Cookies.get('facebookInfo'));

      const dateExpires = new Date(
        1000 * facebookInfoTemp?.data_access_expiration_time
      );

      if (dateExpires > new Date()) setFacebookInfo(facebookInfoTemp);
    }
  }, []);

  useEffect(() => {
    if (facebookInfo?.accessToken) {
      Cookies.set('facebookInfo', JSON.stringify(facebookInfo));
    }
  }, [facebookInfo]);

  return (
    <FacebookContext.Provider
      value={{
        facebookInfo,
        setFacebookInfo,
      }}
    >
      {children}
    </FacebookContext.Provider>
  );
}

export function useFacebookInfo() {
  const context = useContext(FacebookContext);
  const {
    facebookInfo,
    setFacebookInfo,
  }: {
    facebookInfo: IFacebookInfo;
    setFacebookInfo: Dispatch<SetStateAction<IFacebookInfo>>;
  } = context;

  return { facebookInfo, setFacebookInfo };
}
