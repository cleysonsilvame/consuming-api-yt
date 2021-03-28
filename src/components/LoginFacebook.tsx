import Cookies from 'js-cookie';
import FacebookLoginBtnService, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import { useIsLoggedIn } from '../context/Facebook';

export default function LoginFacebook() {
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const { FACEBOOK_APP_ID } = process.env;

  function responseFacebook(response: ReactFacebookLoginInfo) {
    if (response?.accessToken) {
      Cookies.set('facebookInfo', response);
      setIsLoggedIn(true);
    }
  }

  function logoutFacebook() {
    Cookies.remove('facebookInfo');
    setIsLoggedIn(false);
  }

  return isLoggedIn ? (
    <button
      className="btn btn-lg btn-outline-danger btn-block w-100"
      onClick={logoutFacebook}
    >
      Sair do facebook
    </button>
  ) : (
    <FacebookLoginBtnService
      appId={FACEBOOK_APP_ID}
      callback={responseFacebook}
      textButton="Login com Facebook"
      cssClass="btn btn-lg btn-outline-primary btn-block w-100"
    />
  );
}
