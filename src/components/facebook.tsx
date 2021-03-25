import Cookies from 'js-cookie';
import FacebookLoginBtnService, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import { useIsLoggedIn } from '../context/Facebook';

export default function LoginFacebook() {
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

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
      className="mt-3 btn btn-lg btn-outline-danger btn-block"
      onClick={logoutFacebook}
    >
      Sair do facebook
    </button>
  ) : (
    <FacebookLoginBtnService
      appId="776921602933705"
      callback={responseFacebook}
      textButton="Login com Facebook"
      cssClass="mt-3 btn btn-lg btn-outline-primary btn-block"
    />
  );
}
