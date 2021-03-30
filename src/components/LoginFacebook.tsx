import Cookies from 'js-cookie';
import FacebookLoginBtnService, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import { useIsFacebookLoggedIn } from '../context/Facebook';

type Props = {
  appId: string;
};

export default function LoginFacebook({ appId }: Props) {
  const { isFacebookLoggedIn, setIsFacebookLoggedIn } = useIsFacebookLoggedIn();

  function responseFacebook(response: ReactFacebookLoginInfo) {
    if (response.accessToken) {
      Cookies.set('facebookInfo', response);
      setIsFacebookLoggedIn(true);
    }
  }

  function logoutFacebook() {
    Cookies.remove('facebookInfo');
    setIsFacebookLoggedIn(false);
  }

  return isFacebookLoggedIn ? (
    <button
      className="btn btn-lg btn-outline-danger btn-block w-100"
      onClick={logoutFacebook}
    >
      Sair do facebook
    </button>
  ) : (
    <FacebookLoginBtnService
      appId={appId}
      callback={responseFacebook}
      textButton="Login com Facebook"
      cssClass="btn btn-lg btn-outline-primary btn-block w-100"
    />
  );
}
